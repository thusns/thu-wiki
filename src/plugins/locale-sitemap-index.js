const fs = require("fs");
const path = require("path");

/**
 * DocSearch seeds from `/sitemap.xml` only. Docusaurus writes that file for the
 * default locale, so a crawl never sees `/en`, `/ja`, and the other locales.
 * Duplicate each default-locale URL under every other locale prefix.
 *
 * @param {import('@docusaurus/plugin-sitemap').CreateSitemapItemsParams & {
 *   defaultCreateSitemapItems: import('@docusaurus/plugin-sitemap').CreateSitemapItemsFn
 * }} params
 */
async function createLocaleSitemapItems(params) {
  const { defaultCreateSitemapItems, ...rest } = params;
  const items = await defaultCreateSitemapItems(rest);
  const { defaultLocale, locales } = params.siteConfig.i18n;
  const current = process.env.DOCUSAURUS_CURRENT_LOCALE;
  if (current && current !== defaultLocale) {
    return items;
  }

  const origin = params.siteConfig.url.replace(/\/$/, "");
  const extras = [];
  for (const item of items) {
    const pathname = item.url.startsWith(origin)
      ? item.url.slice(origin.length) || "/"
      : new URL(item.url).pathname;
    const suffix = pathname.startsWith("/") ? pathname : `/${pathname}`;
    for (const locale of locales) {
      if (locale === defaultLocale) {
        continue;
      }
      const url =
        suffix === "/"
          ? `${origin}/${locale}/`
          : `${origin}/${locale}${suffix}`;
      extras.push({ ...item, url });
    }
  }
  return items.concat(extras);
}

/** Writes a sitemap index covering every Docusaurus locale after the default-locale build. */
function localeSitemapIndexPlugin(context) {
  return {
    name: "locale-sitemap-index",
    async postBuild({ outDir }) {
      const { defaultLocale, locales } = context.siteConfig.i18n;
      if (context.i18n.currentLocale !== defaultLocale) {
        return;
      }

      const origin = context.siteConfig.url.replace(/\/$/, "");
      const entries = locales
        .map((locale) => {
          const loc =
            locale === defaultLocale
              ? `${origin}/sitemap.xml`
              : `${origin}/${locale}/sitemap.xml`;
          return `  <sitemap>\n    <loc>${loc}</loc>\n  </sitemap>`;
        })
        .join("\n");

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
      fs.writeFileSync(path.join(outDir, "sitemap-index.xml"), xml);
    },
  };
}

module.exports = localeSitemapIndexPlugin;
module.exports.createLocaleSitemapItems = createLocaleSitemapItems;
