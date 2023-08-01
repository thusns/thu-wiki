import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
// import Chatbot from '../Chatbot';


type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: '易于使用',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                THU Wiki在设计之初就考虑到了获取和使用的便捷性，完美适配各种设备，让你可以随时随地获取你想要的信息。
            </>
        ),
    },
    {
        title: '专注于重要事项',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                THU Wiki致力于为你提供最新、最全面的信息，让你可以专注于重要的事情。
            </>
        ),
    },
    {
        title: '强大检索功能',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                THU Wiki拥有强大的检索功能，让你可以快速找到你想要的信息。将来还会支持基于语义的检索，让你可以更加方便地获取信息。
            </>
        ),
    },
];

export default HomePage;

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

export default function HomepageFeatures(): JSX.Element {
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
