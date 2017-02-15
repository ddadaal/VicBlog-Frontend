import * as React from 'react';
import { ArticlePageState, Article } from '../store/ArticlePage';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import moment from 'moment';
import "highlight.js/styles/default.css";
import '../assets/github-markdown.css';
import { Card, Tag } from 'antd';
const hljs = require('highlight.js');
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
});
interface ArticlePanelProps {
    article: Article
}

export class ArticlePanel extends React.Component<ArticlePanelProps, void>{
    render() {

        return (
            <div>
                <br />
                <article className="markdown-body" dangerouslySetInnerHTML={{ __html:md.render(this.props.article.content) }}>
                </article>
            </div>
        )
    }
}