import * as React from 'react';
import { APIs, errorMessage } from '../Utils';
import { Spin, Alert } from 'antd';
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


type AboutMePageProps = typeof actionCreators & { loading: boolean, error: boolean, content: string, loaded: boolean };

class AboutMePage extends React.Component<AboutMePageProps, void>{

    componentDidMount() {
        if (this.props.loaded) {
            return;
        }
        this.props.fetchAboutMe();
    }

    constructor(props) {
        super(props);
    }

    render() {
        return this.props.loading
            ? <div><Spin spinning size="large"> Loading</Spin></div>
            : ( this.props.error 
            ? <Alert type="error" message={errorMessage.Network}/>
            : <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(this.props.content) }} />);
    }
}

export default connect(
    s => ({ ...s.aboutPage.aboutMe }),
    actionCreators
)(AboutMePage);