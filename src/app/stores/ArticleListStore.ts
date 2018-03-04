import { action, computed, observable, runInAction } from "mobx";
import { ArticleBrief, ArticleList } from "../models/Article";
import { APIs } from "../api/ApiDefinition";
import { NetworkStore } from "./NetworkStore";
import * as moment from "moment";

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

const updateThresholdMinutes = 60;

export class ArticleListStore {
  @observable.ref list: ArticleList = null;

  lastUpdated: Date;

  async fetchList() {
    if (this.isOutdated) {
      const list = await this.remoteFetch();
      this.lastUpdated = new Date();
      runInAction(() => {
        this.list = list;
      })
    }
    return this.list;
  }

  private get isOutdated() {
    return !this.lastUpdated || moment().diff(this.lastUpdated, "minutes") >= updateThresholdMinutes;
  }

  async remoteFetch(): Promise<ArticleList> {
    const url = `${APIs.articles}`;
    const {statusCode, response, isNetworkError, error, ok} = await NetworkStore.fetch(url);

    if (ok) {
      return ArticleList.fromJson(response);
    } else if (isNetworkError) {
      throw {type: ArticleListFetchErrorType.NetworkError, error: error}
    } else {
      throw { type: ArticleListFetchErrorType.Unknown };
    }
  }

}