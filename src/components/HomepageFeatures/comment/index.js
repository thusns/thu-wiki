"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Comment;
var react_1 = require("react");
var theme_common_1 = require("@docusaurus/theme-common");
var useDocusaurusContext_1 = require("@docusaurus/useDocusaurusContext");
var BrowserOnly_1 = require("@docusaurus/BrowserOnly");
var react_2 = require("@giscus/react");
var defaultConfig = {
    id: 'comments',
    mapping: 'title',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    lang: 'zh-CN',
    theme: 'light',
    darkTheme: 'dark',
};
function Comment() {
    var themeConfig = (0, theme_common_1.useThemeConfig)();
    var i18n = (0, useDocusaurusContext_1.default)().i18n;
    // merge default config
    var giscus = __assign(__assign({}, defaultConfig), themeConfig.giscus);
    if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
        throw new Error('You must provide `repo`, `repoId`, and `categoryId` to `themeConfig.giscus`.');
    }
    giscus.theme =
        (0, theme_common_1.useColorMode)().colorMode === 'dark' ? giscus.darkTheme : giscus.theme;
    giscus.lang = i18n.currentLocale;
    return (<BrowserOnly_1.default fallback={<div>Loading Comments...</div>}>
            {function () { return <react_2.default {...giscus}/>; }}
        </BrowserOnly_1.default>);
}
