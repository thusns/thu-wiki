import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");
const I18N_DIR = path.join(ROOT, "i18n");
const DOCS_PLUGIN_DIR = path.join("docusaurus-plugin-content-docs", "current");
const CACHE_DIR = path.join(ROOT, ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "translate-docs-cache.json");
const GOOGLE_API_URL = "https://translate.googleapis.com/translate_a/single";
const LIBRE_API_URL = "https://translate.cutie.dating/translate";
const GOOGLE_TIMEOUT_SECONDS = "15";
const LIBRE_TIMEOUT_SECONDS = "30";
const PLACEHOLDER_PREFIX = "@@";
const BATCH_SPLIT = "\n__THU_WIKI_BATCH_SPLIT__\n";

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

const IMAGE_ONLY_DOCS = [
  path.join("社团", "学生社团", "体育类社团.md"),
  path.join("社团", "学生社团", "公益类社团.md"),
  path.join("社团", "学生社团", "思政类社团.md"),
  path.join("社团", "学生社团", "文化类社团.md"),
  path.join("社团", "学生社团", "科创类社团.md"),
  path.join("社团", "学生社团", "素拓类社团.md"),
  path.join("社团", "学生社团", "艺术类社团.md"),
];

const FULL_TRANSLATION_TASKS = {
  en: [
    path.join("本科大事件相关", "推免.md"),
    "校内网站汇总.md",
  ],
  "zh-Hant": [
    path.join("本科大事件相关", "体质测试.md"),
    path.join("校内外生活", "衣食住行", "北京旅游指南", "游乐场.md"),
  ],
  ja: [
    path.join("本科大事件相关", "推免.md"),
    path.join("校园历史文化", "一 二九合唱.md"),
    path.join("thuservices", "templates.md"),
  ],
  ar: [
    path.join("本科大事件相关", "推免.md"),
    "校内网站汇总.md",
    path.join("thuservices", "templates.md"),
  ],
  ru: [
    path.join("本科大事件相关", "推免.md"),
    "校内网站汇总.md",
    path.join("科研", "SRT.md"),
    path.join("thuservices", "templates.md"),
  ],
  fr: [
    path.join("本科大事件相关", "推免.md"),
    "校内网站汇总.md",
    path.join("thuservices", "templates.md"),
  ],
  es: [
    path.join("本科大事件相关", "推免.md"),
    "校内网站汇总.md",
    path.join("thuservices", "templates.md"),
  ],
  de: [
    path.join("本科大事件相关", "推免.md"),
    "校内网站汇总.md",
    path.join("thuservices", "templates.md"),
  ],
  pt: [
    path.join("本科大事件相关", "推免.md"),
    "校内网站汇总.md",
    path.join("thuservices", "templates.md"),
  ],
  ko: [
    path.join("本科大事件相关", "推免.md"),
    "校内网站汇总.md",
    path.join("thuservices", "templates.md"),
  ],
};

const SIDEBAR_LOCALES = ["ja", "ar", "ru", "fr", "es", "de", "pt", "ko"];

const RETRANSLATE_TASKS = {
  "zh-Hant": [path.join("thuservices", "services.md")],
  de: [path.join("thuservices", "services.md")],
  es: [
    path.join("社团", "清华大学科幻协会.md"),
    path.join("thuservices", "README.md"),
    path.join("thuservices", "info.md"),
    path.join("thuservices", "services.md"),
    path.join("thuservices", "utils.md"),
    path.join("thuservices", "templates.md"),
    path.join("体育", "大马杯", "极限飞盘", "极限飞盘.md"),
    path.join("体育", "大马杯", "极限飞盘", "极限飞盘规则.md"),
  ],
  fr: [path.join("thuservices", "services.md")],
};

const LINK_LABEL_MAP = {
  en: {
    here: "here",
    cloudDrive: "Tsinghua Cloud Drive Download",
  },
  "zh-Hant": {
    here: "此處",
    cloudDrive: "清華雲盤下載",
  },
  ja: {
    here: "こちら",
    cloudDrive: "清華クラウドドライブからダウンロード",
  },
  ar: {
    here: "هنا",
    cloudDrive: "تنزيل من Tsinghua Cloud Drive",
  },
  ru: {
    here: "здесь",
    cloudDrive: "Скачать из облачного диска Tsinghua",
  },
  fr: {
    here: "ici",
    cloudDrive: "Télécharger depuis le cloud Tsinghua",
  },
  es: {
    here: "aquí",
    cloudDrive: "Descargar desde Tsinghua Cloud Drive",
  },
  de: {
    here: "hier",
    cloudDrive: "Aus Tsinghua Cloud Drive herunterladen",
  },
  pt: {
    here: "aqui",
    cloudDrive: "Baixar do Tsinghua Cloud Drive",
  },
  ko: {
    here: "여기",
    cloudDrive: "Tsinghua 클라우드 드라이브에서 다운로드",
  },
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCacheKey(sourceLang, target, text) {
  return `${sourceLang}::${target}::${text.replace(/\r\n/g, "\n")}`;
}

function shouldKeepUntranslated(text) {
  const trimmed = text.trim();
  return !trimmed || /^[A-Z][A-Z\s-]*$/.test(trimmed) || /^https?:\/\//.test(trimmed);
}

async function translateText(cache, text, sourceLang, target) {
  if (!text || !text.trim()) {
    return text;
  }
  if (sourceLang === target) {
    return text;
  }

  const normalized = text.replace(/\r\n/g, "\n");
  const key = getCacheKey(sourceLang, target, normalized);
  if (cache[key]) {
    return cache[key];
  }

  const googleSource = sourceLang === "zh-Hans" ? "zh-CN" : sourceLang;
  const libreSource = sourceLang === "zh-TW" ? "zh-Hant" : googleSource;
  const libreTarget = target === "zh-TW" ? "zh-Hant" : target;

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
          `sl=${googleSource}`,
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
            source: libreSource,
            target: libreTarget,
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
      if (
        !message.includes("429") &&
        !message.includes("500") &&
        !message.includes("502") &&
        !message.includes("503")
      ) {
        throw error;
      }
    }

    await sleep(1000 * (attempt + 1));
  }

  throw new Error(`Translation failed for ${sourceLang} -> ${target}`);
}

function protectMarkdown(line) {
  const tokens = [];
  let protectedLine = line;

  const patterns = [
    /```[\s\S]*?```/g,
    /`[^`\n]+`/g,
    /!\[[^\]]*?\]\([^)]+\)/g,
  ];

  for (const pattern of patterns) {
    protectedLine = protectedLine.replace(pattern, (match) => {
      const token = `${PLACEHOLDER_PREFIX}${tokens.length}${PLACEHOLDER_PREFIX}`;
      tokens.push(match);
      return token;
    });
  }

  protectedLine = protectedLine.replace(/\[([^\]]*?)\]\(([^)]+)\)/g, (_, label, url) => {
    const token = `${PLACEHOLDER_PREFIX}${tokens.length}${PLACEHOLDER_PREFIX}`;
    tokens.push(url);
    return `[${label}](${token})`;
  });

  for (const pattern of [/https?:\/\/[^\s)]+/g, /<https?:\/\/[^>]+>/g]) {
    protectedLine = protectedLine.replace(pattern, (match) => {
      const token = `${PLACEHOLDER_PREFIX}${tokens.length}${PLACEHOLDER_PREFIX}`;
      tokens.push(match);
      return token;
    });
  }

  return { protectedLine, tokens };
}

function unprotectMarkdown(line, tokens) {
  return tokens.reduce(
    (acc, token, index) => acc.replaceAll(`${PLACEHOLDER_PREFIX}${index}${PLACEHOLDER_PREFIX}`, token),
    line,
  );
}

function prepareLineTranslation(line) {
  if (!line.trim()) {
    return { translate: false };
  }

  if (
    /^\s*>?[-*]\s+\[[ xX]\]\s+/.test(line) ||
    /^\s*[-*]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    /^\s*#+\s*/.test(line)
  ) {
    const [, prefix = "", body = ""] =
      line.match(/^(\s*(?:>?[-*]|\d+\.|#+)\s*)(.*)$/) || [];
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

  if (
    /^\s*[-*_]{3,}\s*$/.test(line) ||
    /^!\[[^\]]*?\]\([^)]+\)\s*$/.test(line) ||
    /^<https?:\/\/[^>]+>\s*$/.test(line) ||
    /^https?:\/\/\S+\s*$/.test(line)
  ) {
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

async function translateBatch(cache, texts, sourceLang, target) {
  const results = new Array(texts.length);
  const missingIndexes = [];

  for (let index = 0; index < texts.length; index += 1) {
    const key = getCacheKey(sourceLang, target, texts[index]);
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
    const translatedJoined = await translateText(cache, joined, sourceLang, target);
    const split = translatedJoined.split(BATCH_SPLIT);
    if (split.length === missingIndexes.length) {
      split.forEach((translated, offset) => {
        const index = missingIndexes[offset];
        const key = getCacheKey(sourceLang, target, texts[index]);
        cache[key] = translated;
        results[index] = translated;
      });
      return results;
    }
  } catch {
    // Fall through to per-item translation when the batch separator is altered.
  }

  for (const index of missingIndexes) {
    results[index] = await translateText(cache, texts[index], sourceLang, target);
  }

  return results;
}

async function translateFrontmatter(cache, raw, sourceLang, target) {
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
    if (!["title", "description"].includes(key) || !rest.trim()) {
      translatedLines.push(line);
      continue;
    }

    const leading = rest.match(/^\s*/)?.[0] ?? "";
    const trimmed = rest.trim();
    const quoted =
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"));
    const value = quoted ? trimmed.slice(1, -1) : trimmed;
    const translated = await translateText(cache, value, sourceLang, target);
    const nextValue = quoted
      ? `${trimmed[0]}${translated}${trimmed[trimmed.length - 1]}`
      : translated;
    translatedLines.push(`${key}:${leading}${nextValue}`);
  }

  return {
    frontmatter: `---\n${translatedLines.join("\n")}\n---\n`,
    body,
  };
}

async function translateMarkdown(cache, raw, sourceLang, target) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const { frontmatter, body } = await translateFrontmatter(
    cache,
    normalized,
    sourceLang,
    target,
  );
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
      sourceLang,
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

function stripFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return normalized.replace(/^\n+/, "");
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return normalized.replace(/^\n+/, "");
  }

  return normalized.slice(end + 5).replace(/^\n+/, "");
}

async function syncImageOnlyDocs(cache, locale) {
  const target = LOCALE_MAP[locale];
  const localeDocsDir = path.join(I18N_DIR, locale, ...DOCS_PLUGIN_DIR.split(path.sep));

  for (const rel of IMAGE_ONLY_DOCS) {
    const sourceFile = path.join(DOCS_DIR, rel);
    const targetFile = path.join(localeDocsDir, rel);
    const body = stripFrontmatter(fs.readFileSync(sourceFile, "utf8")).trimEnd();
    const sourceTitle = path.basename(rel, ".md");
    const title = await translateText(cache, sourceTitle, "zh-Hans", target);

    ensureDir(path.dirname(targetFile));
    fs.writeFileSync(
      targetFile,
      `---\ntitle: ${JSON.stringify(title)}\n---\n\n${body}\n`,
    );
    console.error(`${locale}: localized title for ${rel}`);
  }
}

async function syncFullDocTranslations(cache, locale) {
  const target = LOCALE_MAP[locale];
  const localeDocsDir = path.join(I18N_DIR, locale, ...DOCS_PLUGIN_DIR.split(path.sep));
  const tasks = [
    ...new Set([
      ...(FULL_TRANSLATION_TASKS[locale] ?? []),
      ...(RETRANSLATE_TASKS[locale] ?? []),
    ]),
  ];

  for (const rel of tasks) {
    const sourceFile = path.join(DOCS_DIR, rel);
    const targetFile = path.join(localeDocsDir, rel);
    const raw = fs.readFileSync(sourceFile, "utf8");
    const translated = await translateMarkdown(cache, raw, "zh-Hans", target);

    ensureDir(path.dirname(targetFile));
    fs.writeFileSync(targetFile, translated);
    console.error(`${locale}: translated ${rel}`);
  }
}

function normalizeLocalizedLinkLabels(locale) {
  const labels = LINK_LABEL_MAP[locale];
  if (!labels) {
    return;
  }

  const localeDocsDir = path.join(I18N_DIR, locale, ...DOCS_PLUGIN_DIR.split(path.sep));
  const stack = [localeDocsDir];

  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (!entry.name.endsWith(".md")) {
        continue;
      }

      const raw = fs.readFileSync(full, "utf8");
      const next = raw
        .replaceAll("[此](", `[${labels.here}](`)
        .replaceAll("[清华云盘下载](", `[${labels.cloudDrive}](`);
      if (next !== raw) {
        fs.writeFileSync(full, next);
      }
    }
  }
}

async function syncSidebarLabels(cache, locale) {
  const target = LOCALE_MAP[locale];
  const sourceFile = path.join(
    I18N_DIR,
    "en",
    "docusaurus-plugin-content-docs",
    "current.json",
  );
  const targetFile = path.join(
    I18N_DIR,
    locale,
    "docusaurus-plugin-content-docs",
    "current.json",
  );
  const source = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
  const translated = structuredClone(source);

  for (const value of Object.values(translated)) {
    if (!value || typeof value.message !== "string") {
      continue;
    }
    if (shouldKeepUntranslated(value.message)) {
      continue;
    }
    value.message = await translateText(cache, value.message, "en", target);
  }

  fs.writeFileSync(targetFile, JSON.stringify(translated, null, 2) + "\n");
  console.error(`${locale}: updated sidebar labels`);
}

async function main() {
  const cache = loadCache();
  const requestedLocales = process.argv.slice(2);
  const locales =
    requestedLocales.length > 0
      ? requestedLocales
      : Object.keys(LOCALE_MAP);

  for (const locale of locales) {
    if (!LOCALE_MAP[locale]) {
      throw new Error(`Unsupported locale: ${locale}`);
    }
    await syncImageOnlyDocs(cache, locale);
    await syncFullDocTranslations(cache, locale);
    if (SIDEBAR_LOCALES.includes(locale)) {
      await syncSidebarLabels(cache, locale);
    }
    normalizeLocalizedLinkLabels(locale);
    saveCache(cache);
  }
}

await main();
