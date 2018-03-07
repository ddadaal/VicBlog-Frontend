import * as React from "react";
import { STORE_ARTICLE_LIST } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import style from '../style';
import * as localStyle from './style.css';
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

interface ArticleListPageContentProps extends ArticleListStoreProps {

}

@inject(STORE_ARTICLE_LIST)
@observer
class ListContent extends React.Component<ArticleListStoreProps, any> {

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


export class ArticleListPageContent extends React.Component<ArticleListPageContentProps, any> {


  render() {
    return <div className={style("w3-row",localStyle.container)}>
      <div className={style("w3-col","m3","w3-mobile", localStyle.left)}>
        <ArticleListFilterPanel />
      </div>
      <div className={style("w3-rest","w3-mobile", localStyle.right)}>
        <ListContent />
        <PageIndicator/>
      </div>
    </div>
  }
}
