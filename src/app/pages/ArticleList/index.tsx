import * as React from "react";
import style from '../../components/style';
import { ArticleListPageContent } from "../../components/ArticleList";
import { ArticleListFilter } from "../../components/ArticleList/ArticleListFilter";
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE, STORE_ARTICLE_LIST } from "../../constants/stores";
import { ArticleListStore } from "../../stores";
import { action, observable, runInAction } from "mobx";
import { ArticleFetchError, FetchedArticle } from "../../stores/ArticleStore";
import { ArticleListFetchError } from "../../stores/ArticleListStore";
import { ArticleBrief, ArticleList } from "../../models/Article";
import { LocaleMessage } from "../../components/Common/Locale";
import { ArticleListFetchingContent } from "../../components/ArticleList/ArticleListFetchingContent";
import { ArticleListFetchErrorContent } from "../../components/ArticleList/ArticleListFetchErrorContent";

interface ArticleListPageProps {
  [STORE_ARTICLE_LIST]?: ArticleListStore;
}

enum FetchStatus {
  NotStarted, Fetching, Fetched, Error
}

@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListPage extends React.Component<ArticleListPageProps, any> {
  @observable.ref list: ArticleList = null;
  @observable.ref error: ArticleListFetchError = null;
  @observable.ref status: FetchStatus = FetchStatus.NotStarted;

  @action async fetch() {
    const store = this.props[STORE_ARTICLE_LIST];
    this.status = FetchStatus.Fetching;
    try {
      const list = await store.fetchList();
      runInAction(() => {
        this.status = FetchStatus.Fetched;
        this.list = list;
      });
    } catch (e) {
      runInAction(() => {
        this.status = FetchStatus.Error;
        this.error = e;
      });
    }
  }

  componentDidMount() {
    this.fetch();
  }

  refetch = () => {
    this.fetch();
  };


  render() {

    let innerElement = null;


    switch (this.status) {
      case FetchStatus.NotStarted:
      case FetchStatus.Fetching:
        innerElement = <ArticleListFetchingContent/>;
        break;
      case FetchStatus.Error:
        innerElement = <ArticleListFetchErrorContent error={this.error}/>;
        break;
      case FetchStatus.Fetched:
        let tags = this.list.list
          .map(x => x.tags)
          .reduce((obj, val) => obj.concat(val), []);
        tags = Array.from(new Set(tags));
        innerElement = <ArticleListPageContent
          tags={tags}
          articleList={this.list}
          lastUpdateTime={this.props[STORE_ARTICLE_LIST].lastUpdated}
          refresh={this.refetch}
        />;
    }

    return <div className={style("w3-container","w3-row")}>
      {innerElement}
    </div>;

  }
}

