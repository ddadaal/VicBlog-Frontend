import React from "react";
import style from "../../style";
import { LocaleMessage } from "../../Common/Locale";

export class ArticleListFetchingContent extends React.Component<any, any> {
  render() {
    return <h3><LocaleMessage id={"articleList.loading"}/></h3>;
  }
}
