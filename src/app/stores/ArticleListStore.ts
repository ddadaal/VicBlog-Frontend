import { action, autorun, computed, observable, runInAction } from "mobx";
import { ArticleBrief } from "../models/Article";

import * as moment from "moment";
import { ArticleFilter } from "../models/ArticleFilter";
import { FetchStatus } from "./index";
import { PagingInfo } from "../models/PagingInfo";
import { STORE_ARTICLE_LIST } from "../constants/stores";
import { ArticleListService } from "../api/ArticleListService";
import { RouterStore } from "./RouterStore";
import { parseQueryString } from "../api/utils";
import { ArticleTag } from "../models/ArticleTag";

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

const defaultPageSize = 10;

const service = new ArticleListService();

export class ArticleListStore {
  @observable lastUpdated: Date;

  constructor() {
    this.fetchTags();
    this.fetchPage();
  }

  @observable filter: ArticleFilter = new ArticleFilter();

  @observable fetchedLists: Map<number, ArticleBrief[]> = new Map();

  @observable fetchStatus: FetchStatus = FetchStatus.NotStarted;

  @observable pageInfo: PagingInfo = PagingInfo.newInstance;

  @observable currentPageNumber: number = 1;

  @observable order: ArticleListOrder = ArticleListOrder.LastEditTimeLatestFirst;

  @observable tags: string[] = [];

  @computed get articleTags() : ArticleTag[] {
    return this.tags.map(x => new ArticleTag(x, this.filter.tags.indexOf(x) >=0));
  }

  @action async fetchTags() {
    const response = await service.fetchTags();
    runInAction(() => {
      this.tags = response;
    });
  }

  expired: boolean = false;

  error: ArticleListFetchError = null;

  @computed get listOfCurrentPage() {
    return this.fetchedLists.get(this.currentPageNumber);
  }

  @action expire() {
    this.expired = true;
  }

  @action async fetchPage() {
    this.fetchStatus = FetchStatus.Fetching;
    if (this.expired || this.pageNeedRefetch(this.currentPageNumber)) {
      try {
        const response = await service.fetchArticleList(defaultPageSize, this.currentPageNumber, this.filter, this.order);
        runInAction(() => {
          this.lastUpdated = new Date();
          this.pageInfo = response.pagingInfo;
          this.fetchedLists.set(this.currentPageNumber, response.list);
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
  [STORE_ARTICLE_LIST]?: ArticleListStore;
}
