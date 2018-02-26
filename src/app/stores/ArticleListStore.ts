import { action, computed, observable, runInAction } from "mobx";
import { ArticleBrief } from "../models/Article";
import { APIs } from "../api/ApiDefinition";
import { NetworkStore } from "./NetworkStore";

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
    const {statusCode, response, isNetworkError, error, ok} = await NetworkStore.fetch(url);

    if (ok) {
      return response;
    } else if (isNetworkError) {
      throw {type: ArticleListFetchErrorType.NetworkError, error: error}
    } else {
      throw { type: ArticleListFetchErrorType.Unknown };
    }
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