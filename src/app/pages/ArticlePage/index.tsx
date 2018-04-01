import React from "react";
import { STORE_ARTICLE } from "../../constants/stores";
import { ArticleFetchError, ArticleStore, FetchedArticle } from "../../stores/ArticleStore";
import { inject, observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";
import style from '../../components/style';
import { ArticleId } from "../../models/Article";
import { ArticleFetchErrorContent } from "../../components/Article/ArticleFetchErrorContent";
import { ArticleFetchingContent } from "../../components/Article/ArticleFetchingContent";
import { ArticlePageContent } from "../../components/Article";
import { PageConfig } from "../index";

interface ArticlePageProps {
  [STORE_ARTICLE]?: ArticleStore,
  articleId: ArticleId
}


enum FetchStatus {
  NotStarted, Fetching, Fetched, Error
}

@inject(STORE_ARTICLE)
@observer
export class ArticlePage extends React.Component<ArticlePageProps, any> {

  @observable.ref article: FetchedArticle = null;
  @observable.ref error: ArticleFetchError = null;
  @observable.ref status: FetchStatus = FetchStatus.NotStarted;

  @action async fetch() {
    const store = this.props[STORE_ARTICLE];
    this.status = FetchStatus.Fetching;
    try {
      const article = await store.fetchArticle(this.props.articleId);
      runInAction(()=> {
        this.status = FetchStatus.Fetched;
        this.article = article;
      });
    } catch (e) {
      runInAction(() => {
        this.status = FetchStatus.Error;
        this.error = e as ArticleFetchError;
      });
    }
  }

  refetch = () => {
    this.fetch();
  };

  render() {
    let innerElement = null;

    switch (this.status) {
      case FetchStatus.NotStarted:
        this.fetch();
      case FetchStatus.Fetching:
        innerElement = <ArticleFetchingContent id={this.props.articleId}/>;
        break;
      case FetchStatus.Error:
        innerElement = <ArticleFetchErrorContent id={this.props.articleId} error={this.error} refetch={this.refetch}/>;
        break;
      case FetchStatus.Fetched:
        innerElement = <ArticlePageContent article={this.article}/>;
    }

    return <div className={style("w3-container","w3-row")}>
      {innerElement}
    </div>;
  }
}

export const articlePageConfig: PageConfig = {
  path: "/articles/:id",
  render: async (props) => {
    const ArticlePage = (await import("./")).ArticlePage;
    return <ArticlePage articleId={props.match.params.id}/>;
  },
  isThisPage(pathname: string): boolean {
    return pathname.match("/articles/[0-9]+") != null;
  },
  exact: true
};


