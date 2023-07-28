// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "THU Wiki",
    tagline: "Tsinghua University Student Network Service Team",
    url: "https://thu.wiki",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "ignore", //Default: "warn"
    favicon: "img/favicon.ico",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "thusns", // Usually your GitHub org/user name.
    projectName: "thu-wiki", // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "zh-Hans",
        locales: ["en", "zh-Hans","zh-Hant", "ja"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/thusns/thu-wiki/tree/main/",
                },
                blog: {
                    // disabled showReadingTime, because it's not supoorted by official preset-classic
                    // showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/thusns/thu-wiki/tree/main/",
                },
                // not duplicate
                // docs: {
                //     sidebarPath: require.resolve("./sidebars.js"),
                //     // disabled showReadingTime, because it's not supoorted by official preset-classic
                //     // showReadingTime: true,
                //     // Please change this to your repo.
                //     // Remove this to remove the "edit this page" links.
                //     editUrl:
                //         "https://github.com/thusns/thu-wiki/tree/main/thu-services",
                // },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                hideOnScroll: true,
                // Right
                title: "THU Wiki",
                logo: {
                    alt: "THU Wiki Logo",
                    src: "img/logo.svg",
                },
                items: [
                    {
                        // main documentation
                        type: "doc",
                        docId: "intro",
                        position: "left",
                        label: "指南",
                    },
                    { to: "/blog", label: "博客", position: "left" },
                    // {
                    //     // THU Services
                    //     type: "doc",
                    //     docId: "welcome",
                    //     position: "left",
                    //     label: "THU Services",
                    // },
                    
                    // Right
                    {
                        type: 'localeDropdown',
                        position: 'right',
                        dropdownItemsAfter: [
                          {
                            type: 'html',
                            value: '<hr style="margin: 0.3rem 0;">',
                          },
                          {
                            href: 'https://github.com/facebook/docusaurus/issues/3526',
                            label: 'Help Us Translate',
                          },
                        ],
                      },
                      {
                        href: 'https://github.com/facebook/docusaurus',
                        position: 'right',
                        className: 'header-github-link',
                        'aria-label': 'GitHub repository',
                      },

                    // },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: "Learn",
                        items: [
                            {
                                label: "指南",
                                to: "/docs/intro",
                            },
                        ],
                    },
                    {
                        title: "Links",
                        items: [
                            {
                                label: "Open Sourced on GitHub",
                                href: "https://github.com/thusns/thu-wiki",
                            },
                        
                        ],
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "Blog",
                                to: "/blog",
                            },
                            {
                                label: "GitHub",
                                href: "https://github.com/thusns/thu-wiki",
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} THU Wiki.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            algolia: {
                // The application ID provided by Algolia
                appId: "6EWYEL4M0G",

                // Public API key: it is safe to commit it
                apiKey: "bb452535c88de607c2cffc81a3ad6ed5",

                indexName: "thu",
                // Send search events to Algolia to improve search quality.
                insights: true,

                // Optional: see doc section below
                contextualSearch: true,

                // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
                externalUrlRegex: "external\\.com|domain\\.com",

                // Optional: Algolia search parameters
                searchParameters: {},

                // Optional: path for search page that enabled by default (`false` to disable it)
                searchPagePath: "search",

                //... other Algolia params
            },
        }),
};
// PWA Support START
module.exports = {
    plugins: [
      [
        '@docusaurus/plugin-pwa',
        {
          pwaHead: [
            {
              tagName: 'link',
              rel: 'icon',
              href: 'static/img/docusaurus.png',
            {
              tagName: 'link',
              rel: 'manifest',
              href: 'static/manifest.json', 
            },
            {
              tagName: 'meta',
              name: 'theme-color',
              content: 'rgb(37, 194, 160)',
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-capable',
              content: 'yes',
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-status-bar-style',
              content: '#000',
            },
            {
              tagName: 'link',
              rel: 'apple-touch-icon',
              href: '/static/img/docusaurus.png',
            },
            {
              tagName: 'link',
              rel: 'mask-icon',
              href: '/static/img/docusaurus.svg',
              color: 'rgb(37, 194, 160)',
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileImage',
              content: 'static/img/docusaurus.png',
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileColor',
              content: '#000',
            },
          ],
        },
      ],
    ],
  };
//PWA Support END

module.exports = {
    themeConfig: {
      announcementBar: {
        id: 'support_us',
        content:
          'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      },
    },
  };


  module.exports = {
    themeConfig: {
      docs: {
        sidebar: {
              autoCollapseCategories: true,
              hideable: true,

            
        },
      },
    },
  };



module.exports = config;
