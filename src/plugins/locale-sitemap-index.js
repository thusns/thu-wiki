const fs = require("fs");
const path = require("path");

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
