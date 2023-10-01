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
        // Suppport some languages
        locales: ["en", "zh-Hans", "zh-Hant", "ja", "ar", "ru", "fr", "es", "de", "pt", "ko"],
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
                    {
                        href: 'https://udify.app/chat/gPiwVj80px4bod7T',
                        label: 'Ask AI',
                    },
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
                            href: 'https://github.com/thusns/thu-wiki/issues/4',
                            label: 'Help Us Translate',
                        },
                        ],
                    },
                    {
                        href: 'https://github.com/thusns/thu-wiki',
                        position: 'right',
                        className: 'header-github-link',
                        label: 'GitHub',
                        'aria-label': 'GitHub repository',
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: "文档",
                        items: [
                            {
                                label: "指南",
                                to: "/docs/intro",
                            },
                        ],
                    },
                    {
                        title: "链接",
                        items: [
                            {
                                label: "在GitHub上开源",
                                href: "https://github.com/thusns/thu-wiki",
                            },
                        
                        ],
                    },
                    {
                        title: "更多",
                        items: [
                            {
                                label: "Blog",
                                to: "/blog",
                            },
                            {
                                label: "/thu-services",
                                href: "https://thu.wiki/docs/category/thu-services",
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} THU Wiki. Built with Docusaurus.`,
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

                //... other Algolia params.
            },
        }),
};
// PWA Support START
module.exports = {
    plugins: [
        [
        '@docusaurus/plugin-pwa',
        {
            debug: true,
            offlineModeActivationStrategies: [
                'appInstalled',
                'standalone',
                'queryString',
            ],
            pwaHead: [
                {
                tagName: 'link',
                rel: 'icon',
                href: '/img/docusaurus.png',
                },
                {
                tagName: 'link',
                rel: 'manifest',
                href: '/manifest.json',
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
                href: '/img/docusaurus.png',
                },
                {
                tagName: 'link',
                rel: 'mask-icon',
                href: '/img/docusaurus.svg',
                color: 'rgb(37, 194, 160)',
                },
                {
                tagName: 'meta',
                name: 'msapplication-TileImage',
                content: '/img/docusaurus.png',
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

// Comment Support START
<script src="https://giscus.app/client.js"
        data-repo="thusns/thuwiki-giscus"
        data-repo-id="R_kgDOKan1Cg"
        data-category="Announcements"
        data-category-id="DIC_kwDOKan1Cs4CZxpc"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>

// Comment Support END

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
            hideable: true,
        },
    },
    },
};

module.exports = config;
