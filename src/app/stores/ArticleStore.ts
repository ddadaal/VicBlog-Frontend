import { Article } from "../models";
import * as moment from 'moment';
import { STORE_ARTICLE } from "../constants/stores";
import { ArticleService } from "../api/ArticleService";

export interface FetchedArticle {
  fetchTime: moment.Moment,
  article: Article
}

export enum ArticleFetchErrorType {
  NotFound, NetworkError, Unknown, ServerError
}

export interface ArticleFetchError {
  type: ArticleFetchErrorType
}

export interface ArticleFetchNetworkError extends ArticleFetchError {
  type: ArticleFetchErrorType.NetworkError,
  error: any
}

const refetchTimeThresholdMinutes = 120;

function needRefetch(date: moment.Moment) {
  return moment().diff(date, "minutes") > refetchTimeThresholdMinutes;
}

const service = new ArticleService();

export class ArticleStore {

  fetchedArticles: Map<number, FetchedArticle> = new Map();

  async fetchArticle(id: number): Promise<FetchedArticle> {
    if (this.fetchedArticles.has(id)) {
      const article = this.fetchedArticles.get(id);
      if (!needRefetch(article.fetchTime)) {
        return article;
      }
    }

    // fetch from backend
    const article = await service.fetchArticle(id);
    this.fetchedArticles.set(id, article);
    return article;

  }

}

export interface ArticleStoreProps {
  [STORE_ARTICLE]?: ArticleStore;
}
