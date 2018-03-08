import * as React from "react";
import { STORE_ARTICLE_LIST } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import { ArticleListContent } from "./ArticleListContent";
import { FetchStatus } from "../../stores";
import { ArticleListStoreProps } from "../../stores/ArticleListStore";
import { ArticleListFetchingContent } from "./ArticleListFetchingContent";
import { ArticleListFetchErrorContent } from "./ArticleListFetchErrorContent";

interface ArticleListPageContentProps extends ArticleListStoreProps {

}

@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListPageContent extends React.Component<ArticleListPageContentProps, any> {

  retry = () => {
    this.props[STORE_ARTICLE_LIST].fetchPage();
  };

  componentDidMount() {
    this.props[STORE_ARTICLE_LIST].completeRefetch();
  }

  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    switch (store.fetchStatus) {
      case FetchStatus.NotStarted:
      case FetchStatus.Fetching:
        return <ArticleListFetchingContent/>;
      case FetchStatus.Error:
        return <ArticleListFetchErrorContent error={store.error} retry={this.retry}/>;
      case FetchStatus.Fetched:
        return <ArticleListContent/>;
    }
  }
}

