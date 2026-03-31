import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useThemeConfig, useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus from '@giscus/react';
const defaultConfig = {
    id: 'comments',
    mapping: 'title',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    lang: 'zh-CN',
    theme: 'light',
    darkTheme: 'dark',
};
export default function Comment() {
    const themeConfig = useThemeConfig();
    const { i18n } = useDocusaurusContext();
    // merge default config
    const giscus = { ...defaultConfig, ...themeConfig.giscus };
    if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
        throw new Error('You must provide `repo`, `repoId`, and `categoryId` to `themeConfig.giscus`.');
    }
    giscus.theme =
        useColorMode().colorMode === 'dark' ? giscus.darkTheme : giscus.theme;
    giscus.lang = i18n.currentLocale;
    return (_jsx(BrowserOnly, { fallback: _jsx("div", { children: "Loading Comments..." }), children: () => _jsx(Giscus, { ...giscus }) }));
}
