import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';
const FeatureList = [
    {
        title: translate({
            id: 'homepage.features.comprehensive.title',
            message: '📚 全面的信息覆盖',
            description: 'Title for the comprehensive coverage feature',
        }),
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (_jsx(Translate, { id: "homepage.features.comprehensive.description", description: "Description for the comprehensive coverage feature", children: "\u6DB5\u76D6\u6821\u56ED\u7F51\u4F7F\u7528\u3001\u9009\u8BFE\u6307\u5357\u3001\u4F53\u80B2\u6D3B\u52A8\u3001\u793E\u56E2\u4FE1\u606F\u3001\u5C31\u533B\u6D41\u7A0B\u7B49\u65B9\u65B9\u9762\u9762\uFF0C \u8BA9\u4F60\u5FEB\u901F\u4E86\u89E3\u6E05\u534E\u5927\u5B66\u7684\u6821\u56ED\u751F\u6D3B\u3002" })),
    },
    {
        title: translate({
            id: 'homepage.features.studentWritten.title',
            message: '🎯 由学生编写',
            description: 'Title for the student-written feature',
        }),
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (_jsx(Translate, { id: "homepage.features.studentWritten.description", description: "Description for the student-written feature", children: "\u7531\u6E05\u534E\u5927\u5B66\u5B66\u751F\u7F51\u7EDC\u670D\u52A1\u56E2\u961F\u548C\u70ED\u5FC3\u540C\u5B66\u5171\u540C\u7EF4\u62A4\uFF0C \u5185\u5BB9\u771F\u5B9E\u53EF\u9760\uFF0C\u8D34\u8FD1\u5B66\u751F\u5B9E\u9645\u9700\u6C42\u3002" })),
    },
    {
        title: translate({
            id: 'homepage.features.search.title',
            message: '🔍 便捷的搜索体验',
            description: 'Title for the search experience feature',
        }),
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (_jsx(Translate, { id: "homepage.features.search.description", description: "Description for the search experience feature", children: "\u5F3A\u5927\u7684\u641C\u7D22\u529F\u80FD\uFF0C\u8BA9\u4F60\u5FEB\u901F\u627E\u5230\u9700\u8981\u7684\u4FE1\u606F\u3002 \u652F\u6301\u591A\u8BED\u8A00\uFF0C\u5B8C\u7F8E\u9002\u914D\u5404\u79CD\u8BBE\u5907\u3002" })),
    },
];
function Feature({ title, Svg, description }) {
    return (_jsxs("div", { className: clsx('col col--4'), children: [_jsx("div", { className: "text--center", children: _jsx(Svg, { className: styles.featureSvg, role: "img" }) }), _jsxs("div", { className: "text--center padding-horiz--md", children: [_jsx("h3", { children: title }), _jsx("p", { children: description })] })] }));
}
export default function HomepageFeatures() {
    return (_jsx("section", { className: styles.features, children: _jsx("div", { className: "container", children: _jsx("div", { className: "row", children: FeatureList.map((props, idx) => (_jsx(Feature, { ...props }, idx))) }) }) }));
}
