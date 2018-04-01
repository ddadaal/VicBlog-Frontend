import React from "react";
import { STORE_ARTICLE_LIST } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import { ArticleListContent } from "./ArticleListContent";
import { FetchStatus } from "../../stores";
import { ArticleListStoreProps } from "../../stores/ArticleListStore";
import { ArticleListFetchingContent } from "./ArticleListFetchingContent";
import { ArticleListFetchErrorContent } from "./ArticleListFetchErrorContent";
import { ArticleFilter } from "../../models/ArticleFilter";

interface ArticleListPageContentProps extends ArticleListStoreProps {
  filter: ArticleFilter;
}

@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListPageContent extends React.Component<ArticleListPageContentProps, any> {

  retry = () => {
    const store = this.props[STORE_ARTICLE_LIST];
    store.fetchPage(store.currentPageNumber, this.props.filter);
  };

  componentDidMount() {
    this.retry();
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

