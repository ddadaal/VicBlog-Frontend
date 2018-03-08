import { action, computed, observable, runInAction } from "mobx";
import { ArticleBrief } from "../models/Article";

import * as moment from "moment";
import { ArticleFilter, articleFilterMatches } from "../models/ArticleFilter";
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
  @observable lastUpdated: Date;

  @observable fetchedLists: Map<number, ArticleBrief[]> = new Map();

  @observable fetchStatus: FetchStatus = FetchStatus.NotStarted;


  @observable pageInfo: PagingInfo = PagingInfo.newInstance;

  @observable nextFilter: ArticleFilter = ArticleFilter.newInstance({});
  currentFilter: ArticleFilter = null;

  @observable nextListOrder: ArticleListOrder = ArticleListOrder.LastEditTimeLatestFirst;
  currentListOrder: ArticleListOrder = null;


  @observable nextPageNumber: number = 1;
  @observable currentPageNumber: number = 1;


  error: ArticleListFetchError = null;

  @computed get listOfCurrentPage() {
    return this.fetchedLists.get(this.currentPageNumber);
  }

  @action setPageNumber(number: number) {
    this.nextPageNumber = number;
  }

  @action setOrder(order: ArticleListOrder) {
    this.nextListOrder = order;
  }

  @computed get orderMatches() {
    return this.nextListOrder === this.currentListOrder;
  }

  @computed get filterMatches() {
    return articleFilterMatches(this.nextFilter, this.currentFilter);
  }

  @action completeRefetch = async () => {
    this.fetchStatus = FetchStatus.Fetching;

    try {
      const response = await service.fetchArticleList(defaultPageSize, this.nextPageNumber, this.nextFilter, this.nextListOrder);
      runInAction(() => {
        this.lastUpdated = new Date();
        this.pageInfo = response.pagingInfo;
        this.fetchedLists.clear();
        this.fetchedLists.set(this.nextPageNumber, response.list);

        this.currentPageNumber = this.nextPageNumber;
        this.currentFilter = this.nextFilter.clone();
        this.currentListOrder = this.nextListOrder;

        this.fetchStatus = FetchStatus.Fetched;
      });
      return;
    } catch (e) {
      runInAction(() => {
        this.fetchStatus = FetchStatus.Error;
        this.error = e;
      });
      return;
    }
  };

  @action fetchPage = async () => {
    if (this.pageNeedRefetch(this.nextPageNumber)) {
      this.fetchStatus = FetchStatus.Fetching;
      try {
        const response = await service.fetchArticleList(defaultPageSize, this.nextPageNumber, this.currentFilter, this.currentListOrder);
        runInAction(() => {
          this.lastUpdated = new Date();
          this.pageInfo = response.pagingInfo;
          this.fetchedLists.set(this.nextPageNumber, response.list);
          this.currentPageNumber = this.nextPageNumber;
          this.fetchStatus = FetchStatus.Fetched;
        });
        return;
      } catch (e) {
        runInAction(() => {
          this.fetchStatus = FetchStatus.Error;
          this.error = e;
        });
        return;
      }
    }
    runInAction( () => {
      this.currentPageNumber = this.nextPageNumber;
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
