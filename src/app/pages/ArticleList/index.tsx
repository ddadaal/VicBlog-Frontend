import * as React from "react";
import { PageConfig } from "../index";

export class ArticleListPage extends React.Component<any, any> {

  render() {
    return <p>ArticleListPage</p>;
  }
}

export const articleListPageConfig: PageConfig = {
  isThisPage: (pathname: string): boolean => {
    return pathname === "/articles";
  },
  render: props => <ArticleListPage/>,
  path: "/articles",
  exact: true
};
