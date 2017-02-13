import * as React from 'react';
import {Row, Col, Input} from 'antd';
import "highlight.js/styles/default.css";
import "../assets/github-markdown.css";
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
interface MarkdownEditorProps {
    content: string
    onContentChange : (content:string)=>any
}



export class MarkdownEditor extends React.Component<MarkdownEditorProps, void>{
    constructor(){
        super();
    }

    handleInputChange(e:any){
        this.props.onContentChange(e.target.value);
    }
    render(){
        return (
            <div>
                <Row gutter={16}>
                    <Col md={12} lg={12} sm={24} xs={0}>
                    <div >
                        <Input type="textarea" autosize={{minRows: 4}} placeholder="Input your comment here..." value={this.props.content} onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    </Col>
                    <Col md={12} lg={12} sm={24} xs={0}>
                        <div className="markdown-body" dangerouslySetInnerHTML={{__html: md.render(this.props.content)}}/>
                    </Col>
                </Row>
            </div>
        )
    }
}