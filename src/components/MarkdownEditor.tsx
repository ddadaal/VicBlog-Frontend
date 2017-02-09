import * as React from 'react';
import {Row, Col, Input} from 'antd';
import "highlight.js/styles/default.css";
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

interface MarkdownEditorStates{
    content: string
}


export class MarkdownEditor extends React.Component<void, MarkdownEditorStates>{
    constructor(){
        super();
        this.state = {
            content: ""
        };
    }

    handleInputChange(e:any){
        this.setState({
            content: e.target.value
        });
    }
    render(){
        return (
            <div>
                <Row gutter={16}>
                    <Col md={12} lg={12} sm={24} xs={0}>
                    <div >
                        <Input type="textarea" autosize={{minRows: 4}} placeholder="Input your comment here..." value={this.state.content} onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    </Col>
                    <Col md={12} lg={12} sm={24} xs={0}>
                        <div dangerouslySetInnerHTML={{__html: md.render(this.state.content)}}/>
                    </Col>
                </Row>
            </div>
        )
    }
}