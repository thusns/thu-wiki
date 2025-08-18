"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomepageFeatures;
var react_1 = require("react");
var clsx_1 = require("clsx");
var styles_module_css_1 = require("./styles.module.css");
// START of AI Assistant component
var react_2 = require("react");
function ChatApp() {
    (0, react_2.useEffect)(function () {
        var script = document.createElement('script');
        script.src = 'https://udify.app/embed.min.js';
        script.id = 'gPiwVj80px4bod7T';
        script.defer = true;
        document.body.appendChild(script);
        return function () {
            document.body.removeChild(script);
        };
    }, []);
    return <div />;
}
// END of AI Assistant component
var FeatureList = [
    {
        title: '易于使用',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (<>
                THU Wiki在设计之初就考虑到了获取和使用的便捷性，完美适配各种设备，让你可以随时随地获取你想要的信息。
            </>),
    },
    {
        title: '专注于重要事项',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (<>
                THU Wiki致力于为你提供最新、最全面的信息，让你可以专注于重要的事情。
            </>),
    },
    {
        title: '强大检索功能',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (<>
                THU Wiki拥有强大的检索功能，让你可以快速找到你想要的信息。将来还会支持基于语义的检索，让你可以更加方便地获取信息。
            </>),
    },
];
function Feature(_a) {
    var title = _a.title, Svg = _a.Svg, description = _a.description;
    return (<div className={(0, clsx_1.default)('col col--4')}>
            <div className="text--center">
                <Svg className={styles_module_css_1.default.featureSvg} role="img"/>
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>);
}
function HomepageFeatures() {
    return (<section className={styles_module_css_1.default.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map(function (props, idx) { return (<Feature key={idx} {...props}/>); })}
                </div>
                <div className="row">
                    <div className="col col--4"></div>
                    <div className="col col--4">
                        <ChatApp />
                    </div>
                    <div className="col col--4"></div>
                </div>
            </div>
        </section>);
}
