import * as React from 'react';
import "highlight.js/styles/default.css";
import "../../assets/github-markdown.css";
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

interface MarkdownDisplayProps {
    content: string,
}

export default class MarkdownDisplay extends React.Component<MarkdownDisplayProps,void>{
    render(){
        return <div className="markdown-body" dangerouslySetInnerHTML={{__html: md.render(
          this.props.content)}}/>
    }
}
