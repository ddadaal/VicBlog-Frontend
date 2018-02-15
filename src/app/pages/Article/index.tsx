import * as React from "react";
import { PageConfig } from "../index";

interface ArticlePageProps {
  articleId: number
}


export class ArticlePage extends React.Component<ArticlePageProps, any> {
  render() {
    return <p>Article Page {this.props.articleId}</p>;
  }
}

export const articlePageConfig: PageConfig = {
  path: "/articles/:id",
  render: (props) => <ArticlePage articleId={props.match.params.id}/>,
  isThisPage(pathname: string): boolean {
    return pathname.match("/articles/[0-9]+") != null;
  },
  exact: true
};