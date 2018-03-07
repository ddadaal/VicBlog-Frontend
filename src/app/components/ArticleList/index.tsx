import * as React from "react";
import { STORE_ARTICLE_LIST } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import style from '../style';
import * as localStyle from '../../pages/Home/style.css';
import { ArticleList } from "../../models/Article";
import { ArticleListFilterPanel } from "./ArticleListFilterPanel";
import { ArticleListContent } from "./ArticleListContent";
import { observable, runInAction } from "mobx";
import { ArticleListStore, FetchStatus } from "../../stores";
import { ArticleFilter } from "../../models/ArticleFilter";
import { ArticleListStoreProps } from "../../stores/ArticleListStore";
import { ArticleListFetchingContent } from "./ArticleListFetchingContent";
import { ArticleListFetchErrorContent } from "./ArticleListFetchErrorContent";
import { PageIndicator } from "./PageIndicator";
import { ProfilePanel } from "../ProfilePanel";

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

