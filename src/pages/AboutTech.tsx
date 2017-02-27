import * as React from 'react';
import { APIs } from '../Utils';
import { Spin } from 'antd';
import { actionCreators } from '../store/AboutPage';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import "highlight.js/styles/default.css";
import "../assets/github-markdown.css";
const hljs = require('highlight.js');
var md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) { }
        }
        try {
            return hljs.highlightAuto(str).value;
        } catch (err) { }

        return ''; // use external default escaping
    }
});


type AboutTechPageProps = typeof actionCreators & { loading: boolean, error: boolean, content: string, loaded: boolean };

class AboutTechPage extends React.Component<AboutTechPageProps, void>{

    componentDidMount() {
        if (this.props.loaded) {
            return;
        }
        this.props.fetchAboutTech();
    }

    constructor(props) {
        super(props);
    }

    render() {
        return this.props.loading
            ? <div><Spin spinning size="large"> Loading</Spin></div>
            : <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(this.props.content) }} />
    }
}

export default connect(
    s => ({ ...s.aboutPage.aboutTech }),
    actionCreators
)(AboutTechPage);