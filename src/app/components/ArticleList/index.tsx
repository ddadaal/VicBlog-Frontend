import React from "react";
import { observer } from "mobx-react";
import { ArticleListContent } from "./ArticleListContent";
import { ArticleListStore } from "../../stores";
import { ArticleListFetchingContent } from "./ArticleListFetchingContent";
import { ArticleListFetchErrorContent } from "./ArticleListFetchErrorContent";
import { Inject } from "react.di";
import { FetchStatus } from "../../stores/common";

interface ArticleListPageContentProps  {

}


@observer
export class ArticleListPageContent extends React.Component<ArticleListPageContentProps, any> {

  @Inject articleListStore: ArticleListStore;

  retry = () => {
    this.articleListStore.fetchPage();
  };

  render() {
    const store = this.articleListStore;
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

