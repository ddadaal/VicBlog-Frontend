import * as React from 'react';
import { ReactType } from 'react';
import * as ReactMarkdown from "react-markdown";
import * as githubStyle from './github-markdown.css';
import { SyntaxHighlightedCodeBlock } from "./renderers";
import { AsyncComponent } from "../../../routes/AsyncComponent";

export interface MarkdownDisplayProps {
  content: string,
  renderers?: {[s: string]: ReactType},
}

const defaultRenderers = {
  code: SyntaxHighlightedCodeBlock
};

export class _MarkdownDisplay extends React.Component<MarkdownDisplayProps,any>{


  render(){

    const mergedRenderers = {...defaultRenderers, ...this.props.renderers};
    return <ReactMarkdown className={githubStyle["markdown-body"]} source={this.props.content} renderers={mergedRenderers}/>;
  }
}

export class MarkdownDisplay extends React.Component<MarkdownDisplayProps, any> {

  load = async () => {
    const Display = (await import("./"))._MarkdownDisplay;
    return <Display {...this.props}/>
  };

  render() {
    return <AsyncComponent render={this.load}/>
  }
}