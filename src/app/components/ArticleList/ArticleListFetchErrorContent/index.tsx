import React from "react";
import { LocaleMessage } from "../../Common/Locale";
import { ArticleListFetchError } from "../../../stores/ArticleListStore";

interface ArticleListFetchErrorContentProps {
  error: ArticleListFetchError;
}

export class ArticleListFetchErrorContent extends React.Component<ArticleListFetchErrorContentProps, any> {
  render() {
    return <h3><LocaleMessage id={"articleList.loading"}/></h3>;
  }
}
