import React from "react";
import { ArticleStore, FetchedArticle } from "../../stores/ArticleStore";
import { observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";
import style from '../../components/style';
import { ArticleId } from "../../models/Article";
import { ArticleFetchErrorContent } from "../../components/Article/ArticleFetchErrorContent";
import { ArticleFetchingContent } from "../../components/Article/ArticleFetchingContent";
import { ArticlePageContent } from "../../components/Article";
import { Inject } from "react.di";
import { ArticleFetchError } from "../../api/ArticleService";

interface ArticlePageProps {
  articleId: ArticleId
}


enum FetchStatus {
  NotStarted, Fetching, Fetched, Error
}

@observer
export class ArticlePage extends React.Component<ArticlePageProps, any> {

  
  @Inject articleStore: ArticleStore;
  
  @observable.ref article: FetchedArticle = null;
  @observable.ref error: ArticleFetchError = null;
  @observable.ref status: FetchStatus = FetchStatus.NotStarted;

  @action async fetch() {
    const store = this.articleStore;
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

  componentDidMount() {
    this.fetch();
  }

  render() {
    let innerElement = null;

    switch (this.status) {
      case FetchStatus.NotStarted:
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

