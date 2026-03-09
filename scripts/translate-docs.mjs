import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");
const I18N_DIR = path.join(ROOT, "i18n");
const CACHE_DIR = path.join(ROOT, ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "translate-docs-cache.json");
const SOURCE_LOCALE = "zh-Hans";
const PLACEHOLDER_PREFIX = "__THU_WIKI_TOKEN_";
const BATCH_SPLIT = "\n__THU_WIKI_BATCH_SPLIT__\n";
const GOOGLE_API_URL = "https://translate.googleapis.com/translate_a/single";
const LIBRE_API_URL = "https://translate.cutie.dating/translate";
const GOOGLE_TIMEOUT_SECONDS = "15";
const LIBRE_TIMEOUT_SECONDS = "30";

const LOCALE_MAP = {
  en: "en",
  "zh-Hant": "zh-TW",
  ja: "ja",
  ar: "ar",
  ru: "ru",
  fr: "fr",
  es: "es",
  de: "de",
  pt: "pt",
  ko: "ko",
};

const KEEP_SEGMENTS = new Set(["thuservices", "file", "image", "cal", "README"]);
const FM_TRANSLATABLE_KEYS = new Set(["title", "description"]);
const MD_FILES_TO_SKIP_DELETE = new Set([
  path.join("thuservices", "README.md"),
  path.join("thuservices", "accounts.md"),
  path.join("thuservices", "info.md"),
  path.join("thuservices", "services.md"),
  path.join("thuservices", "templates.md"),
  path.join("thuservices", "utils.md"),
  path.join("thuservices", "websites.md"),
]);

function walk(dir, matcher) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full, matcher));
      continue;
    }
    if (matcher(full)) {
      out.push(full);
    }
  }
  return out.sort();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function removeDirIfExists(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDirRecursive(fromDir, toDir) {
  ensureDir(toDir);
  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const from = path.join(fromDir, entry.name);
    const to = path.join(toDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(from, to);
    } else {
      ensureDir(path.dirname(to));
      fs.copyFileSync(from, to);
    }
  }
}

function removeLocalizedTextFiles(localeDir) {
  if (!fs.existsSync(localeDir)) {
    return;
  }
  for (const file of walk(localeDir, (full) => full.endsWith(".md") || path.basename(full) === "_category_.json")) {
    fs.unlinkSync(file);
  }
}

function loadCache() {
  if (!fs.existsSync(CACHE_FILE)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
}

function saveCache(cache) {
  ensureDir(CACHE_DIR);
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + "\n");
}

function containsCJK(value) {
  return /[\u3400-\u9fff]/.test(value);
}

function shouldReuseExistingContent(locale, sourceRaw, existingRaw) {
  if (locale === "zh-Hant") {
    return false;
  }
  const source = sourceRaw.replace(/\r\n/g, "\n").trim();
  const existing = existingRaw.replace(/\r\n/g, "\n").trim();
  if (!existing || existing === source) {
    return false;
  }
  const compact = existing.replace(/\s/g, "");
  const cjkCount = (compact.match(/[\u3400-\u9fff]/g) || []).length;
  return cjkCount / Math.max(1, compact.length) < 0.15;
}

function sanitizeSegment(value) {
  return value
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/^\.+$/, "-")
    .trim();
}

function toPosix(relPath) {
  return relPath.split(path.sep).join("/");
}

function getDocId(relPath) {
  return toPosix(relPath).replace(/\.md$/i, "");
}

function getLocalizedSlug(relPath) {
  const posixPath = getDocId(relPath);
  const base = path.posix.basename(posixPath);
  if (base === "README" || base === "index") {
    const dir = path.posix.dirname(posixPath);
    return dir === "." ? "/" : `/${dir}`;
  }
  return `/${posixPath}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateText(cache, text, target) {
  if (!text || !text.trim()) {
    return text;
  }
  if (target === SOURCE_LOCALE) {
    return text;
  }
  const normalized = text.replace(/\r\n/g, "\n");
  const key = `${SOURCE_LOCALE}::${target}::${normalized}`;
  if (cache[key]) {
    return cache[key];
  }

  const tryGoogle = () => {
    const payload = JSON.parse(
      execFileSync(
        "curl",
          [
            "-sS",
            "--max-time",
            GOOGLE_TIMEOUT_SECONDS,
            "-G",
          GOOGLE_API_URL,
          "--data-urlencode",
          "client=gtx",
          "--data-urlencode",
          "sl=zh-CN",
          "--data-urlencode",
          `tl=${target}`,
          "--data-urlencode",
          "dt=t",
          "--data-urlencode",
          `q=${normalized}`,
        ],
        { encoding: "utf8" },
      ),
    );

    return Array.isArray(payload?.[0])
      ? payload[0].map((part) => part?.[0] ?? "").join("")
      : normalized;
  };

  const tryLibre = () => {
    const payload = JSON.parse(
      execFileSync(
        "curl",
        [
          "-sS",
          "--max-time",
          LIBRE_TIMEOUT_SECONDS,
          LIBRE_API_URL,
          "-H",
          "Content-Type: application/json",
          "-d",
          JSON.stringify({
            q: normalized,
            source: SOURCE_LOCALE,
            target: target === "zh-TW" ? "zh-Hant" : target,
            format: "text",
          }),
        ],
        { encoding: "utf8" },
      ),
    );

    return payload.translatedText ?? normalized;
  };

  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      let translated;
      try {
        translated = tryGoogle();
      } catch {
        translated = tryLibre();
      }
      cache[key] = translated;
      return translated;
    } catch (error) {
      const message = String(error?.stderr || error?.message || error);
      if (!message.includes("429") && !message.includes("500") && !message.includes("502") && !message.includes("503")) {
        throw error;
      }
    }

    await sleep(1000 * (attempt + 1));
  }

  throw new Error(`Translation failed for ${target} after retries`);
}

function protectMarkdown(line) {
  const tokens = [];
  let protectedLine = line;

  const patterns = [
    /```[\s\S]*?```/g,
    /`[^`\n]+`/g,
    /!\[[^\]]*?\]\([^)]+\)/g,
    /\[[^\]]*?\]\([^)]+\)/g,
    /https?:\/\/[^\s)]+/g,
    /<https?:\/\/[^>]+>/g,
  ];

  for (const pattern of patterns) {
    protectedLine = protectedLine.replace(pattern, (match) => {
      const token = `${PLACEHOLDER_PREFIX}${tokens.length}__`;
      tokens.push(match);
      return token;
    });
  }

  return { protectedLine, tokens };
}

function unprotectMarkdown(line, tokens) {
  return tokens.reduce(
    (acc, token, index) => acc.replaceAll(`${PLACEHOLDER_PREFIX}${index}__`, token),
    line,
  );
}

async function translateLine(cache, line, target) {
  const prepared = prepareLineTranslation(line);
  if (!prepared.translate) {
    return line;
  }
  const translated = await translateText(cache, prepared.text, target);
  return prepared.restore(translated);
}

function prepareLineTranslation(line) {
  if (!line.trim()) {
    return { translate: false };
  }
  if (/^\s*>?[-*]\s+\[[ xX]\]\s+/.test(line) || /^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line) || /^\s*#+\s*/.test(line)) {
    const [, prefix = "", body = ""] = line.match(/^(\s*(?:>?[-*]|\d+\.|#+)\s*)(.*)$/) || [];
    if (!body) {
      return { translate: false };
    }
    const { protectedLine, tokens } = protectMarkdown(body);
    return {
      translate: true,
      text: protectedLine,
      restore(translated) {
        return prefix + unprotectMarkdown(translated, tokens);
      },
    };
  }

  if (/^\s*[-*_]{3,}\s*$/.test(line) || /^!\[[^\]]*?\]\([^)]+\)\s*$/.test(line) || /^<https?:\/\/[^>]+>\s*$/.test(line) || /^https?:\/\/\S+\s*$/.test(line)) {
    return { translate: false };
  }

  const { protectedLine, tokens } = protectMarkdown(line);
  return {
    translate: true,
    text: protectedLine,
    restore(translated) {
      return unprotectMarkdown(translated, tokens);
    },
  };
}

async function translateBatch(cache, texts, target) {
  const results = new Array(texts.length);
  const missingIndexes = [];

  for (let index = 0; index < texts.length; index += 1) {
    const text = texts[index];
    const key = `${SOURCE_LOCALE}::${target}::${text.replace(/\r\n/g, "\n")}`;
    if (cache[key]) {
      results[index] = cache[key];
    } else {
      missingIndexes.push(index);
    }
  }

  if (missingIndexes.length === 0) {
    return results;
  }

  const joined = missingIndexes.map((index) => texts[index]).join(BATCH_SPLIT);

  try {
    const translatedJoined = await translateText(cache, joined, target);
    const split = translatedJoined.split(BATCH_SPLIT);
    if (split.length === missingIndexes.length) {
      split.forEach((translated, offset) => {
        const index = missingIndexes[offset];
        const normalized = texts[index].replace(/\r\n/g, "\n");
        cache[`${SOURCE_LOCALE}::${target}::${normalized}`] = translated;
        results[index] = translated;
      });
      return results;
    }
  } catch {
    // Fall through to per-item translation.
  }

  for (const index of missingIndexes) {
    results[index] = await translateText(cache, texts[index], target);
  }

  return results;
}

async function translateFrontmatter(cache, raw, target) {
  if (!raw.startsWith("---\n")) {
    return { frontmatter: "", body: raw };
  }
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    return { frontmatter: "", body: raw };
  }
  const block = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const lines = block.split("\n");
  const translatedLines = [];

  for (const line of lines) {
    const match = line.match(/^([A-Za-z0-9_-]+):(.*)$/);
    if (!match) {
      translatedLines.push(line);
      continue;
    }
    const [, key, rest] = match;
    if (!FM_TRANSLATABLE_KEYS.has(key) || !rest.trim()) {
      translatedLines.push(line);
      continue;
    }
    const leading = rest.match(/^\s*/)?.[0] ?? "";
    const trimmed = rest.trim();
    const quote = (trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"));
    const value = quote ? trimmed.slice(1, -1) : trimmed;
    const translated = await translateText(cache, value, target);
    const escaped = quote ? `${trimmed[0]}${translated}${trimmed[trimmed.length - 1]}` : translated;
    translatedLines.push(`${key}:${leading}${escaped}`);
  }

  return {
    frontmatter: `---\n${translatedLines.join("\n")}\n---\n`,
    body,
  };
}

async function translateMarkdown(cache, raw, target) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const { frontmatter, body } = await translateFrontmatter(cache, normalized, target);
  const lines = body.split("\n");
  const out = [...lines];
  let inFence = false;
  const batch = [];

  async function flushBatch() {
    if (batch.length === 0) {
      return;
    }
    const translated = await translateBatch(
      cache,
      batch.map((item) => item.prepared.text),
      target,
    );
    batch.forEach((item, index) => {
      out[item.index] = item.prepared.restore(translated[index]);
    });
    batch.length = 0;
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*```/.test(line)) {
      await flushBatch();
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }
    const prepared = prepareLineTranslation(line);
    if (!prepared.translate) {
      await flushBatch();
      continue;
    }
    batch.push({ index, prepared });
    if (batch.length >= 80) {
      await flushBatch();
    }
  }

  await flushBatch();

  return `${frontmatter}${out.join("\n").replace(/\s+$/u, "")}\n`;
}

function upsertDocIdentity(raw, sourceRel, translatedRel) {
  const id = getDocId(sourceRel);
  const slug = getLocalizedSlug(translatedRel);
  const normalized = raw.replace(/\r\n/g, "\n");

  if (normalized.startsWith("---\n")) {
    const end = normalized.indexOf("\n---\n", 4);
    if (end !== -1) {
      const block = normalized.slice(4, end).split("\n");
      const body = normalized.slice(end + 5);
      const filtered = block.filter((line) => !/^id:\s*/.test(line) && !/^slug:\s*/.test(line));
      const nextBlock = [`id: ${id}`, `slug: ${slug}`, ...filtered].join("\n");
      return `---\n${nextBlock}\n---\n${body.replace(/^\n/, "")}`;
    }
  }

  return `---\nid: ${id}\nslug: ${slug}\n---\n\n${normalized.replace(/^\n+/, "")}`;
}

async function translateSegment(cache, segment, target) {
  if (!containsCJK(segment) || KEEP_SEGMENTS.has(segment)) {
    return segment;
  }
  const translated = await translateText(cache, segment, target);
  return sanitizeSegment(translated) || segment;
}

async function translateRelativePath(cache, relPath, target) {
  const parts = relPath.split(path.sep);
  const translatedParts = [];
  for (const part of parts) {
    const ext = path.extname(part);
    const stem = ext ? part.slice(0, -ext.length) : part;
    const translatedStem = await translateSegment(cache, stem, target);
    translatedParts.push(`${translatedStem}${ext}`);
  }
  return path.join(...translatedParts);
}

async function translateCategoryJson(cache, sourceFile, targetFile, target) {
  const raw = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
  const cloned = structuredClone(raw);
  if (typeof cloned.label === "string") {
    cloned.label = await translateText(cache, cloned.label, target);
  }
  if (cloned.link && typeof cloned.link.description === "string") {
    cloned.link.description = await translateText(cache, cloned.link.description, target);
  }
  ensureDir(path.dirname(targetFile));
  fs.writeFileSync(targetFile, JSON.stringify(cloned, null, 4) + "\n");
}

async function generateLocale(locale) {
  const target = LOCALE_MAP[locale];
  if (!target) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const cache = loadCache();
  const localeDocsDir = path.join(I18N_DIR, locale, "docs");
  const stagingDocsDir = path.join(I18N_DIR, locale, ".docs-staging");
  removeDirIfExists(stagingDocsDir);
  ensureDir(stagingDocsDir);

  const sourceMarkdownFiles = walk(DOCS_DIR, (full) => full.endsWith(".md"));
  const pathMap = new Map();

  for (let index = 0; index < sourceMarkdownFiles.length; index += 1) {
    const file = sourceMarkdownFiles[index];
    const rel = path.relative(DOCS_DIR, file);
    const translatedRel = await translateRelativePath(cache, rel, target);
    pathMap.set(rel, translatedRel);
    if ((index + 1) % 10 === 0 || index + 1 === sourceMarkdownFiles.length) {
      console.error(`${locale}: translated paths ${index + 1}/${sourceMarkdownFiles.length}`);
      saveCache(cache);
    }
  }

  for (let index = 0; index < sourceMarkdownFiles.length; index += 1) {
    const file = sourceMarkdownFiles[index];
    const rel = path.relative(DOCS_DIR, file);
    const translatedRel = pathMap.get(rel);
    const targetFile = path.join(stagingDocsDir, translatedRel);
    const raw = fs.readFileSync(file, "utf8");
    const existingFile = path.join(localeDocsDir, rel);
    let translated;

    if (fs.existsSync(existingFile)) {
      const existingRaw = fs.readFileSync(existingFile, "utf8");
      if (shouldReuseExistingContent(locale, raw, existingRaw)) {
        translated = existingRaw.replace(/\r\n/g, "\n");
      }
    }

    if (!translated) {
      translated = await translateMarkdown(cache, raw, target);
    }

    translated = upsertDocIdentity(translated, rel, translatedRel);

    ensureDir(path.dirname(targetFile));
    fs.writeFileSync(targetFile, translated);
    console.error(`${locale}: wrote ${index + 1}/${sourceMarkdownFiles.length} ${translatedRel}`);
    saveCache(cache);
  }

  const categorySource = path.join(DOCS_DIR, "thuservices", "_category_.json");
  const categoryTarget = path.join(stagingDocsDir, "thuservices", "_category_.json");
  await translateCategoryJson(cache, categorySource, categoryTarget, target);
  saveCache(cache);

  ensureDir(localeDocsDir);
  removeLocalizedTextFiles(localeDocsDir);
  copyDirRecursive(stagingDocsDir, localeDocsDir);
  removeDirIfExists(stagingDocsDir);
  console.error(`${locale}: completed`);
}

const locales = process.argv.slice(2);
if (locales.length === 0) {
  console.error("Usage: node scripts/translate-docs.mjs <locale> [locale...]");
  process.exit(1);
}

for (const locale of locales) {
  await generateLocale(locale);
}
