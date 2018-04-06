import { action, computed, observable, runInAction } from "mobx";
import { ArticleBrief } from "../models/Article";
import { Inject, Injectable } from "react.di";
import { ArticleListFetchError, ArticleListOrder, ArticleListService } from "../api/ArticleListService";
import moment from 'moment';
import { FetchStatus } from "./common";
import { ArticleFilter } from "../models/ArticleFilter";

const updateThresholdMinutes = 30;

const recentArticlesCount = 3;

@Injectable
export class HomepageStore {
  @observable lastUpdated: Date;
  @observable recentArticles: ArticleBrief[] = [];
  @observable recentArticlesFetchStatus: FetchStatus = FetchStatus.NotStarted;
  @observable recentArticlesFetchError: ArticleListFetchError;

  expired: boolean= true;

  @action expire() {
    this.expired = true;
  }

  constructor(@Inject private articleListService: ArticleListService) {
    this.fetchRecentArticles();
  }

  @computed get fetching() {
    return this.recentArticlesFetchStatus === FetchStatus.Fetching;
  }

  @action async fetchRecentArticles() {
    this.recentArticlesFetchStatus = FetchStatus.Fetching;
    if (this.expired || this.recentArticlesOutdated) {
      try {
        const response = await this.articleListService.fetchArticleList(
          recentArticlesCount,
          1,
          new ArticleFilter(),
          ArticleListOrder.LastEditTimeLatestFirst
        );
        runInAction(() => {
          this.lastUpdated = new Date();
          this.recentArticles = response.list;
        });
      } catch (e) {
        runInAction(() => {
          this.recentArticlesFetchStatus = FetchStatus.Error;
          this.recentArticlesFetchError = e;
        });
        return;
      }
    }
    runInAction( () => {
      this.expired = false;
      this.recentArticlesFetchStatus = FetchStatus.Fetched;
    });
  };

  private get recentArticlesOutdated() {
    return !this.lastUpdated
      || moment().diff(this.lastUpdated, "minutes") >= updateThresholdMinutes;
  }
}
