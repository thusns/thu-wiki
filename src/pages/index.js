import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';
function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (_jsx("header", { className: clsx('hero hero--primary', styles.heroBanner), children: _jsxs("div", { className: "container", children: [_jsx("h1", { className: "hero__title", children: _jsx(Translate, { id: "homepage.title", description: "The homepage welcome title", values: { siteTitle: siteConfig.title }, children: '欢迎来到 {siteTitle}' }) }), _jsx("p", { className: "hero__subtitle", children: _jsx(Translate, { id: "homepage.subtitle", description: "The homepage subtitle", children: "\u6E05\u534E\u5927\u5B66\u5B66\u751F\u767E\u79D1\u5168\u4E66 | \u4F60\u7684\u6821\u56ED\u751F\u6D3B\u6307\u5357" }) }), _jsx("p", { style: { fontSize: '1.1rem', marginTop: '1rem', marginBottom: '2rem' }, children: _jsx(Translate, { id: "homepage.description", description: "The homepage description paragraph", children: "\u4ECE\u5165\u5B66\u5230\u6BD5\u4E1A\uFF0CTHU Wiki \u4E3A\u4F60\u63D0\u4F9B\u5168\u65B9\u4F4D\u7684\u6821\u56ED\u751F\u6D3B\u4FE1\u606F\uFF0C\u5305\u62EC\u5B66\u4E60\u3001\u751F\u6D3B\u3001\u793E\u56E2\u3001\u4F53\u80B2\u7B49\u5404\u4E2A\u65B9\u9762\u3002" }) }), _jsx("div", { className: styles.buttons, children: _jsx(Link, { className: "button button--secondary button--lg", to: "/docs/intro", children: _jsx(Translate, { id: "homepage.cta", description: "The homepage call-to-action button label", children: "\u5F00\u59CB\u63A2\u7D22 \u2192" }) }) })] }) }));
}
export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (_jsxs(Layout, { title: translate({
            id: 'homepage.layoutTitle',
            message: 'Introducing {siteTitle}',
            description: 'The homepage layout title',
        }, { siteTitle: siteConfig.title }), description: translate({
            id: 'homepage.layoutDescription',
            message: 'THU Wiki - 清华大学学生百科全书',
            description: 'The homepage meta description',
        }), children: [_jsx(HomepageHeader, {}), _jsx("main", { children: _jsx(HomepageFeatures, {}) })] }));
}
