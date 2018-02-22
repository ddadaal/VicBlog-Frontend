import * as React from "react";
import { Article } from "../../../models";
import { ArticleMeta } from "./ArticleMeta";


interface ArticleContentProps {
  article: Article,
  contentHtml: string
}

export class ArticleContent extends React.Component<ArticleContentProps, any> {
  render() {
    return <div>
      <h1>{this.props.article.title}</h1>
      <ArticleMeta article={this.props.article}/>
      <hr/>
      <div dangerouslySetInnerHTML={{__html: this.props.contentHtml}}/>
      <hr/>

    </div>;
  }
}