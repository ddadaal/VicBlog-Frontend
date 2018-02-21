import * as React from "react";

interface ArticlePageProps {
  articleId: number
}


export class ArticlePage extends React.Component<ArticlePageProps, any> {
  render() {
    return <p>Article Page 123 {this.props.articleId}</p>;
  }
}

