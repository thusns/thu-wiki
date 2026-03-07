import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">
                    <Translate
                        id="homepage.title"
                        description="The homepage welcome title"
                        values={{siteTitle: siteConfig.title}}>
                        {'欢迎来到 {siteTitle}'}
                    </Translate>
                </h1>
                <p className="hero__subtitle">
                    <Translate
                        id="homepage.subtitle"
                        description="The homepage subtitle">
                        清华大学学生百科全书 | 你的校园生活指南
                    </Translate>
                </p>
                <p style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '2rem' }}>
                    <Translate
                        id="homepage.description"
                        description="The homepage description paragraph">
                        从入学到毕业，THU Wiki 为你提供全方位的校园生活信息，包括学习、生活、社团、体育等各个方面。
                    </Translate>
                </p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        <Translate
                            id="homepage.cta"
                            description="The homepage call-to-action button label">
                            开始探索 →
                        </Translate>
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
            title={translate({
                id: 'homepage.layoutTitle',
                message: 'Introducing {siteTitle}',
                description: 'The homepage layout title',
            }, {siteTitle: siteConfig.title})}
            description={translate({
                id: 'homepage.layoutDescription',
                message: 'THU Wiki - 清华大学学生百科全书',
                description: 'The homepage meta description',
            })}>
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
