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
        defaultLocale: "en",
        locales: ["zh-Hans", "en"],
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
                        "https://github.com/thusns/thu-wiki/tree/main/docs/",
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/thusns/thu-wiki/tree/main/blog/",
                },
                // not duplicate
                docs: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/thusns/thu-wiki/tree/main/thu-services",
                },
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
                    { to: "/blog", label: "SNS Blog", position: "left" },
                    {
                        // THU Services
                        type: "doc",
                        docId: "welcome",
                        position: "left",
                        label: "THU Services",
                    },
                    
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

module.exports = config;
