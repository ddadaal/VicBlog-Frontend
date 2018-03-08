import React from "react";
import { LocaleMessage } from "../../Common/Locale";
import { Spin } from "../../Common/Spin";

export class ArticleListFetchingContent extends React.Component<any, any> {
  render() {
    return <h3><Spin/><LocaleMessage id={"articleList.loading"}/></h3>;
  }
}
