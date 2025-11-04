import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: React.JSX.Element;
};



const FeatureList: FeatureItem[] = [
    {
        title: '📚 全面的信息覆盖',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                涵盖校园网使用、选课指南、体育活动、社团信息、就医流程等方方面面，
                让你快速了解清华大学的校园生活。
            </>
        ),
    },
    {
        title: '🎯 由学生编写',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                由清华大学学生网络服务团队和热心同学共同维护，
                内容真实可靠，贴近学生实际需求。
            </>
        ),
    },
    {
        title: '🔍 便捷的搜索体验',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                强大的搜索功能，让你快速找到需要的信息。
                支持多语言，完美适配各种设备。
            </>
        ),
    },
];

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
