import { action, computed, observable, runInAction } from "mobx";
import { ArticleBrief } from "../models/Article";
import { APIs } from "../api/ApiDefinition";

enum ArticleListFetchErrorType {
  NetworkError, Unknown
}

export interface ArticleListFetchError {
  type:ArticleListFetchErrorType
}

export interface ArticleListFetchNetworkError extends ArticleListFetchError {
  type: ArticleListFetchErrorType.NetworkError,
  error: any
}

export enum ArticleListFetchState {
  Standby, Fetching, Fetched
}

export class ArticleListStore {
  @observable.ref list: ArticleBrief[] = null;

  lastUpdated: Date;
  @observable fetchState: ArticleListFetchState = ArticleListFetchState.Standby;

  @computed get fetched() {
    return this.fetchState === ArticleListFetchState.Fetched;
  }

  async remoteFetch(): Promise<ArticleBrief[]> {
    const url = `${APIs.articles}`;
    let error: ArticleListFetchError;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (res.ok) {
        return json;
      } else {
        error = { type: ArticleListFetchErrorType.Unknown };
      }
    } catch (e) {
      error = {type: ArticleListFetchErrorType.NetworkError, error: e} as ArticleListFetchNetworkError;
    }
    throw error;
  }

  @action startFetch =  async () => {
    this.fetchState = ArticleListFetchState.Fetching;
    this.list = await this.remoteFetch();
    runInAction("article list fetch complete", () => {
      this.lastUpdated = new Date();
      this.fetchState = ArticleListFetchState.Fetched;
    });
  };

}