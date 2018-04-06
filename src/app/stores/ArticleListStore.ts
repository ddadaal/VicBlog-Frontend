import { action, computed, observable, runInAction } from "mobx";
import { ArticleBrief } from "../models/Article";

import moment from "moment";
import { ArticleFilter } from "../models/ArticleFilter";
import { PagingInfo } from "../models/PagingInfo";
import { ArticleListFetchError, ArticleListOrder, ArticleListService } from "../api/ArticleListService";
import { ArticleTag } from "../models/ArticleTag";
import { Inject, Injectable } from "react.di";
import { FetchStatus } from "./common";





const updateThresholdMinutes = 60;

const defaultPageSize = 5;

@Injectable
export class ArticleListStore {

  @observable lastUpdated: Date;

  constructor(@Inject private articleListService: ArticleListService) {
    this.fetchTags();
    this.fetchPage();
  }

  @observable filter: ArticleFilter = new ArticleFilter();

  @observable fetchedLists: Map<number, ArticleBrief[]> = new Map();

  @observable fetchStatus: FetchStatus = FetchStatus.NotStarted;

  @observable pagingInfo: PagingInfo = new PagingInfo();

  @observable currentPageNumber: number = 1;

  @observable order: ArticleListOrder = ArticleListOrder.LastEditTimeLatestFirst;

  @observable tags: string[] = [];

  expired: boolean = false;

  error: ArticleListFetchError = null;

  @computed get articleTags() : ArticleTag[] {
    return this.tags.map(x => new ArticleTag(x, this.filter.tags.indexOf(x) >=0));
  }

  @action async fetchTags() {
    const response = await this.articleListService.fetchTags();
    runInAction(() => {
      this.tags = response;
    });
  }



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
        const response = await this.articleListService.fetchArticleList(defaultPageSize, this.currentPageNumber, this.filter, this.order);
        runInAction(() => {
          this.lastUpdated = new Date();
          this.pagingInfo = response.pagingInfo;
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

