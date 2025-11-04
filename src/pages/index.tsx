import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">欢迎来到 {siteConfig.title}</h1>
                <p className="hero__subtitle">清华大学学生百科全书 | 你的校园生活指南</p>
                <p style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '2rem' }}>
                    从入学到毕业，THU Wiki 为你提供全方位的校园生活信息，包括学习、生活、社团、体育等各个方面。
                </p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        开始探索 →
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home(): React.JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Introducing ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
