import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const I18N_DIR = path.join(ROOT, "i18n");
const DOCS_PLUGIN_DIR = path.join("docusaurus-plugin-content-docs", "current");
const SOURCE_THUSERVICES_DIR = path.join(ROOT, "docs", "thuservices");

const LOCALES = ["en", "zh-Hant", "ja", "ar", "ru", "fr", "es", "de", "pt", "ko"];

function walk(dir, predicate) {
  const out = [];
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full, predicate));
    } else if (predicate(full)) {
      out.push(full);
    }
  }
  return out.sort();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(fromDir, toDir) {
  if (!fs.existsSync(fromDir)) {
    return;
  }
  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const from = path.join(fromDir, entry.name);
    const to = path.join(toDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      ensureDir(path.dirname(to));
      fs.copyFileSync(from, to);
    }
  }
}

function sanitizeMdx(raw, file) {
  let sanitized = raw
    .replace(/<((?:https?:\/\/|mailto:)[^>\s]+)>/g, "$1")
    .replace(/<([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})>/g, "$1")
    .replace(/(^|[^\w])<(?=\d)/g, "$1&lt;")
    .replace(/(^|[^\w])<=(?=\d)/g, "$1&lt;=");

  if (file.includes(`${path.sep}thuservices${path.sep}`)) {
    sanitized = sanitized
      .replace(/\]\(file\//g, "](/docs/thuservices/file/")
      .replace(/\]\(image\//g, "](/docs/thuservices/image/");
  }

  return sanitized;
}

for (const locale of LOCALES) {
  const localeDocsDir = path.join(I18N_DIR, locale, DOCS_PLUGIN_DIR);
  const thuservicesDir = path.join(localeDocsDir, "thuservices");
  ensureDir(thuservicesDir);
  copyDir(path.join(SOURCE_THUSERVICES_DIR, "file"), path.join(thuservicesDir, "file"));
  copyDir(path.join(SOURCE_THUSERVICES_DIR, "image"), path.join(thuservicesDir, "image"));
  fs.copyFileSync(
    path.join(SOURCE_THUSERVICES_DIR, "_category_.json"),
    path.join(thuservicesDir, "_category_.json"),
  );

  for (const file of walk(localeDocsDir, (full) => full.endsWith(".md"))) {
    const raw = fs.readFileSync(file, "utf8");
    const sanitized = sanitizeMdx(raw, file);
    if (sanitized !== raw) {
      fs.writeFileSync(file, sanitized);
    }
  }

  console.error(`${locale}: sanitized localized MDX`);
}
