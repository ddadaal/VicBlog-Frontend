import { Article } from "../models";
import * as moment from 'moment';
import { APIs } from "../api/ApiDefinition";

export interface FetchedArticle {
  fetchTime: moment.Moment,
  article: Article
}

export enum ArticleFetchErrorType {
  NotFound, NetworkError, Unknown
}

export interface ArticleFetchError {
  type:ArticleFetchErrorType
}

export interface ArticleFetchNetworkError extends ArticleFetchError {
  type: ArticleFetchErrorType.NetworkError,
  error: any
}

const refetchTimeThresholdMinutes = 120;

export class ArticleStore {
  fetchedArticles: Map<number, FetchedArticle> = new Map();

  needRefetch(date: moment.Moment) {
    return moment().diff(date, "minutes") > refetchTimeThresholdMinutes;
  }

  async remoteFetch(id: number): Promise<FetchedArticle> {
    const url = `${APIs.articles}/${id}`;
    let error: ArticleFetchError;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (res.ok) {
        return {
          fetchTime: moment(),
          article: json
        };
      } else {
        if (res.status === 404) {
          error = { type: ArticleFetchErrorType.NotFound };
        } else {
          error = {type: ArticleFetchErrorType.Unknown};
        }

      }
    } catch (e) {
      error = {type: ArticleFetchErrorType.NetworkError, error: e} as ArticleFetchNetworkError;
    }
    throw error;
  }

  async fetchArticle(id: number): Promise<FetchedArticle> {
    if (this.fetchedArticles.has(id)) {
      const article = this.fetchedArticles.get(id);
      if (!this.needRefetch(article.fetchTime)) {
        return article;
      }
    }

    // fetch from backend
    const article = await this.remoteFetch(id);
    this.fetchedArticles.set(id, article);
    return article;

  }


}