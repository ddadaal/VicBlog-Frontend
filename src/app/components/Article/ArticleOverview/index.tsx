import React from "react";
import { ArticleLinks } from "./ArticleLinks";

interface ArticleOverviewProps {
  content: string;
  className?: string;
}


export class ArticleOverview extends React.Component<ArticleOverviewProps, any> {

  render() {
    return <div className={this.props.className}>
      <ArticleLinks content={this.props.content}/>
    </div>;
  }

}
