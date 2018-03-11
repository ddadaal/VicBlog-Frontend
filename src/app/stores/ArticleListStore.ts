import { action, computed, observable, runInAction } from "mobx";
import { ArticleBrief, ArticleList } from "../models/Article";

import * as moment from "moment";
import { ArticleFilter } from "../models/ArticleFilter";
import { FetchStatus } from "./index";
import { PagingInfo } from "../models/PagingInfo";
import { STORE_ARTICLE_LIST } from "../constants/stores";
import { ArticleListService } from "../api/ArticleListService";

export enum ArticleListFetchErrorType {
  NetworkError, Unknown, ServerError
}

export interface ArticleListFetchError {
  type: ArticleListFetchErrorType;
}

export interface ArticleListFetchNetworkError extends ArticleListFetchError {
  type: ArticleListFetchErrorType.NetworkError;
  error: any;
}

export enum ArticleListOrder
{
  LastEditTimeLatestFirst = "LastEditTimeLatestFirst",
  LastEditTimeEarliestFirst = "LastEditTimeEarliestFirst",
  CreateTimeLatestFirst = "CreateTimeLatestFirst",
  CreateTimeEarliestFirst = "CreateTimeEarliestFirst",
  LikeLeastFirst = "LikeLeastFirst",
  LikeMostFirst = "LikeMostFirst"
}



const updateThresholdMinutes = 60;

const defaultPageSize = 1;

const service = new ArticleListService();

export class ArticleListStore {
  lastUpdated: Date;

  @observable fetchedLists: Map<number, ArticleBrief[]> = new Map();

  @observable fetchStatus: FetchStatus = FetchStatus.NotStarted;

  @observable pageInfo: PagingInfo = PagingInfo.newInstance;

  @observable currentPageNumber: number = 1;

  @observable order: ArticleListOrder = ArticleListOrder.LastEditTimeLatestFirst;

  expired: boolean = false;

  error: ArticleListFetchError = null;

  @computed get listOfCurrentPage() {
    return this.fetchedLists.get(this.currentPageNumber);
  }

  @action expire() {
    this.expired = true;
  }

  @action async fetchPage(nextPageNumber: number, filter: ArticleFilter = new ArticleFilter()) {
    this.fetchStatus = FetchStatus.Fetching;
    this.currentPageNumber = nextPageNumber;
    if (this.expired || this.pageNeedRefetch(nextPageNumber)) {
      try {
        const response = await service.fetchArticleList(defaultPageSize, nextPageNumber, filter, this.order);
        runInAction(() => {
          this.lastUpdated = new Date();
          this.pageInfo = response.pagingInfo;
          this.fetchedLists.set(nextPageNumber, response.list);
        });
      } catch (e) {
        runInAction(() => {
          this.fetchStatus = FetchStatus.Error;
          this.error = e;
        });
        return;
      }
    }
    runInAction( () => {
      this.expired = false;
      this.fetchStatus = FetchStatus.Fetched;
    });
  };


  private pageNeedRefetch(pageNumber: number) {
    return this.isOutdated || !this.fetchedLists.has(pageNumber);
  }


  private get isOutdated() {
    return !this.lastUpdated || moment().diff(this.lastUpdated, "minutes") >= updateThresholdMinutes;
  }

}

export interface ArticleListStoreProps {
  [STORE_ARTICLE_LIST]?: ArticleListStore
}
