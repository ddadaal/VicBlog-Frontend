import React from "react";
import { Article } from "../../../models";
import style from '../../style';
import { EnhancedMarkdownDisplay } from "./EnhancedMarkdownDisplay";

interface ArticleContentProps {
  article: Article,
}

export class ArticleContent extends React.Component<ArticleContentProps, any> {
  render() {
    return <div className={style("w3-container")}>
      <EnhancedMarkdownDisplay content={this.props.article.content}/>
    </div>;
  }
}
