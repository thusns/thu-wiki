import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");
const I18N_DIR = path.join(ROOT, "i18n");
const GOOGLE_API_URL = "https://translate.googleapis.com/translate_a/single";
const LIBRE_API_URL = "https://translate.cutie.dating/translate";

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

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out = out.concat(walk(full));
    } else if (entry.isFile() && full.endsWith(".md")) {
      out.push(full);
    }
  }
  return out.sort();
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

function stripFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return normalized;
  }
  const end = normalized.indexOf("\n---\n", 4);
  return end === -1 ? normalized : normalized.slice(end + 5);
}

function extractFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return {};
  }
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return {};
  }
  return Object.fromEntries(
    normalized
      .slice(4, end)
      .split("\n")
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value]),
  );
}

function extractTitle(raw, relPath) {
  const frontmatter = extractFrontmatter(raw);
  if (frontmatter.title) {
    return frontmatter.title.replace(/^["']|["']$/g, "");
  }
  const body = stripFrontmatter(raw);
  const heading = body.split("\n").find((line) => /^#\s+/.test(line));
  if (heading) {
    return heading.replace(/^#\s+/, "").trim();
  }
  return path.basename(relPath, ".md");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function lineKind(line, inFence) {
  if (inFence) {
    return "code";
  }
  if (!line.trim()) {
    return "blank";
  }
  if (/^\s*```/.test(line)) {
    return "fence";
  }
  if (/^\s*#+\s+/.test(line)) {
    return `h${(line.match(/^(\s*#+)/)?.[0].trim().length ?? 1)}`;
  }
  if (/^\s*>\s*/.test(line)) {
    return "quote";
  }
  if (/^\s*[-*]\s+\[[ xX]\]\s+/.test(line)) {
    return "task";
  }
  if (/^\s*[-*]\s+/.test(line)) {
    return "ul";
  }
  if (/^\s*\d+\.\s+/.test(line)) {
    return "ol";
  }
  return "p";
}

function extractTargets(line) {
  const targets = [];
  for (const match of line.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)) {
    targets.push(`img:${match[1]}`);
  }
  for (const match of line.matchAll(/\[[^\]]*]\(([^)]+)\)/g)) {
    targets.push(`ln:${match[1]}`);
  }
  for (const match of line.matchAll(/https?:\/\/[^\s)>]+/g)) {
    targets.push(`url:${match[0]}`);
  }
  return targets.sort();
}

function buildSignature(raw) {
  const body = stripFrontmatter(raw);
  const lines = body.split("\n");
  const kinds = [];
  const targets = [];
  let inFence = false;

  for (const line of lines) {
    const kind = lineKind(line, inFence);
    if (kind !== "blank") {
      kinds.push(kind);
    }
    targets.push(...extractTargets(line));
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
    }
  }

  return JSON.stringify({
    kinds,
    targets: targets.sort(),
  });
}

function upsertDocIdentity(raw, sourceRel, localizedRel) {
  const id = getDocId(sourceRel);
  const slug = getLocalizedSlug(localizedRel);
  const normalized = raw.replace(/\r\n/g, "\n");

  if (normalized.startsWith("---\n")) {
    const end = normalized.indexOf("\n---\n", 4);
    if (end !== -1) {
      const block = normalized.slice(4, end).split("\n");
      const body = normalized.slice(end + 5);
      const filtered = block.filter((line) => !/^id:\s*/.test(line) && !/^slug:\s*/.test(line));
      return `---\nid: ${id}\nslug: ${slug}\n${filtered.join("\n")}\n---\n${body.replace(/^\n/, "")}`;
    }
  }

  return `---\nid: ${id}\nslug: ${slug}\n---\n\n${normalized.replace(/^\n+/, "")}`;
}

function buildSourceMap() {
  const sourceMap = new Map();
  const sourceEntries = [];
  for (const sourceFile of walk(DOCS_DIR)) {
    const raw = fs.readFileSync(sourceFile, "utf8");
    const sig = buildSignature(raw);
    const rel = path.relative(DOCS_DIR, sourceFile);
    const list = sourceMap.get(sig) ?? [];
    list.push(rel);
    sourceMap.set(sig, list);
    sourceEntries.push({
      rel,
      title: extractTitle(raw, rel),
    });
  }
  return { sourceMap, sourceEntries };
}

async function translateToChinese(text, locale) {
  if (locale === "zh-Hant") {
    return text;
  }
  const target = LOCALE_MAP[locale];

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const payload = JSON.parse(
        execFileSync(
          "curl",
          [
            "-sS",
            "--max-time",
            "15",
            "-G",
            GOOGLE_API_URL,
            "--data-urlencode",
            "client=gtx",
            "--data-urlencode",
            `sl=${target}`,
            "--data-urlencode",
            "tl=zh-CN",
            "--data-urlencode",
            "dt=t",
            "--data-urlencode",
            `q=${text}`,
          ],
          { encoding: "utf8" },
        ),
      );
      return Array.isArray(payload?.[0]) ? payload[0].map((part) => part?.[0] ?? "").join("") : text;
    } catch {
      try {
        const payload = JSON.parse(
          execFileSync(
            "curl",
            [
              "-sS",
              "--max-time",
              "20",
              LIBRE_API_URL,
              "-H",
              "Content-Type: application/json",
              "-d",
              JSON.stringify({
                q: text,
                source: target,
                target: "zh-Hans",
                format: "text",
              }),
            ],
            { encoding: "utf8" },
          ),
        );
        return payload.translatedText ?? text;
      } catch {
        await sleep(1000 * (attempt + 1));
      }
    }
  }

  return text;
}

function normalizeComparable(text) {
  return text.replace(/[\s"'“”‘’【】（）()\-_,.:：；、?？!！]/g, "").toLowerCase();
}

function scoreSimilarity(a, b) {
  const left = normalizeComparable(a);
  const right = normalizeComparable(b);
  if (!left || !right) {
    return 0;
  }
  let score = 0;
  for (const ch of new Set(left)) {
    if (right.includes(ch)) {
      score += 1;
    }
  }
  return score / Math.max(left.length, right.length);
}

async function bestTitleMatch(locale, localizedFile, raw, sourceEntries) {
  const localizedTitle = extractTitle(raw, localizedFile);
  const localizedChineseTitle = await translateToChinese(localizedTitle, locale);
  return sourceEntries
    .map((entry) => ({
      rel: entry.rel,
      score: scoreSimilarity(localizedChineseTitle, entry.title),
    }))
    .sort((a, b) => b.score - a.score)[0];
}

async function run(locale, sourceMap, sourceEntries) {
  const localeDocsDir = path.join(I18N_DIR, locale, "docs");
  for (const localizedFile of walk(localeDocsDir)) {
    const raw = fs.readFileSync(localizedFile, "utf8");
    const sig = buildSignature(raw);
    let matches = sourceMap.get(sig) ?? [];

    if (matches.length > 1) {
      const localizedChineseTitle = await translateToChinese(extractTitle(raw, localizedFile), locale);
      const ranked = matches.map((sourceRel) => {
        const entry = sourceEntries.find((item) => item.rel === sourceRel);
        return {
          sourceRel,
          score: scoreSimilarity(localizedChineseTitle, entry?.title ?? ""),
        };
      }).sort((a, b) => b.score - a.score);
      matches = ranked.length > 0 ? [ranked[0].sourceRel] : [];
    }

    if (matches.length === 0) {
      const best = await bestTitleMatch(locale, localizedFile, raw, sourceEntries);
      matches = best ? [best.rel] : [];
    }

    if (matches.length !== 1) {
      throw new Error(`${locale}: signature match failure for ${path.relative(localeDocsDir, localizedFile)} (${matches.length} matches)`);
    }

    const sourceRel = matches[0];
    const localizedRel = path.relative(localeDocsDir, localizedFile);
    const patched = upsertDocIdentity(raw, sourceRel, localizedRel);
    fs.writeFileSync(localizedFile, patched);
  }

  console.error(`${locale}: fixed ids and slugs`);
}

const locales = process.argv.slice(2);
if (locales.length === 0) {
  console.error("Usage: node scripts/fix-localized-doc-ids.mjs <locale> [locale...]");
  process.exit(1);
}

const { sourceMap, sourceEntries } = buildSourceMap();
for (const locale of locales) {
  await run(locale, sourceMap, sourceEntries);
}
