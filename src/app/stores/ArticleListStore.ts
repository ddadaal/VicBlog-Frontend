import { action, computed, observable, runInAction, transaction } from "mobx";
import { ArticleBrief, ArticleList } from "../models/Article";
import { APIs } from "../api/ApiDefinition";
import { NetworkStore } from "./NetworkStore";
import * as moment from "moment";
import { ArticleFilter, articleFilterMatches } from "../models/ArticleFilter";
import { FetchStatus } from "./index";
import { PagingInfo } from "../models/PagingInfo";
import { STORE_ARTICLE_LIST } from "../constants/stores";

export enum ArticleListFetchErrorType {
  NetworkError, Unknown
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

const defaultPageSize = 10;

async function remoteFetch(pageSize: number, pageNumber: number, filter: ArticleFilter, order: ArticleListOrder): Promise<ArticleList> {
  const url = NetworkStore.appendQueryString(`${APIs.articles}`,
    {...filter, order: order, pageNumber: pageNumber, pageSize: pageSize});
  const { response, isNetworkError, error, ok} = await NetworkStore.fetch(url);

  if (ok) {
    return ArticleList.fromJson(response);
  } else if (isNetworkError) {
    throw {type: ArticleListFetchErrorType.NetworkError, error: error};
  } else {
    throw {type: ArticleListFetchErrorType.Unknown};
  }
}

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
    this.nextPageNumber = 1;

    if (this.orderMatches && this.filterMatches) {
      this.currentPageNumber = 1;

      this.fetchStatus = FetchStatus.Fetched;
      return;
    }


    try {
      const response = await remoteFetch(defaultPageSize, this.nextPageNumber, this.nextFilter, this.nextListOrder);
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
        const response = await remoteFetch(defaultPageSize, this.nextPageNumber, this.currentFilter, this.currentListOrder);
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
