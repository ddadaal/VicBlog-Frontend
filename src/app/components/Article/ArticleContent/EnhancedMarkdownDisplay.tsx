import * as React from "react";
import { MarkdownDisplay } from "../../Common/MarkdownDisplay";
import { Heading } from "./HeadingRenderer";


interface EnhancedMarkdownDisplayProps {
  content: string
}

const renderers = {
  heading: Heading
};


export class EnhancedMarkdownDisplay extends React.Component<EnhancedMarkdownDisplayProps, any> {
  render() {

    return <MarkdownDisplay renderers={renderers} content={this.props.content}/>
  }
}