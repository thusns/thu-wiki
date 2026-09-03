# AGENTS.md — thu-wiki

Docusaurus 3 static wiki (`thusns/thu-wiki`). Node `24.x`. Package manager: npm (`package-lock.json`).

## Security overrides (`package.json` `overrides`)

Transitive CVEs are pinned here; do not drop them without replacing with an equal-or-newer patched version.

| Package | Pin | Notes |
| :---: | :---: | :---: |
| browserslist | 4.28.8 | CVE-2026-73088, CVE-2026-73089 (High). Vulnerable `<= 4.28.6`. |
| fast-uri | 3.1.7 | CVE-2026-75931 (High). Vulnerable `>= 3.1.3 < 3.1.6`. Stay on 3.1.x unless all consumers accept 4.x. |
| postcss-selector-parser@6 | 6.1.4 | CVE-2026-9358 (Low). Vulnerable `>= 6.1.0 < 6.1.3`. Do not override unscoped 7.x (already 7.1.5). |
| postcss | 8.5.23 | Existing pin. |
| nanoid | 3.3.18 | CVE-2026-67213. |
| js-yaml@3 / @4 | 3.15.1 / 4.3.1 | GHSA-5p4m-2wfm-xmqj. |
| brace-expansion | 5.0.9 | Existing pin. |
| shell-quote | 1.10.0 | Existing pin. |

Vendored `image-size@2.0.3` lives in `vendor/image-size` (upstream archived at 2.0.2).

## Commands

- `npm ci` then `npm run typecheck` for a cheap check.
- `npm run build` is the full Docusaurus build (heavier).

Last updated: 2026-09-03
