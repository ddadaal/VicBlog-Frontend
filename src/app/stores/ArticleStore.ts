import { Article } from "../models";
import * as moment from 'moment';
import { APIs } from "../api/ApiDefinition";
import { NetworkStore } from "./NetworkStore";
import { STORE_ARTICLE, STORE_LOCALE } from "../constants/stores";

export interface FetchedArticle {
  fetchTime: moment.Moment,
  article: Article
}

export enum ArticleFetchErrorType {
  NotFound, NetworkError, Unknown
}

export interface ArticleFetchError {
  type: ArticleFetchErrorType
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
    const {statusCode, response, error, ok, isNetworkError} = await NetworkStore.fetch(url);
    if (ok) {
      return {
        fetchTime: moment(),
        article: Article.fromJson(response)
      };
    } else if (isNetworkError) {
      throw {type: ArticleFetchErrorType.NetworkError, error: error}
    } else if (statusCode === 404) {
      throw {type: ArticleFetchErrorType.NotFound};
    } else {
      throw {type: ArticleFetchErrorType.Unknown}
    }
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

export interface ArticleStoreProps {
  [STORE_ARTICLE]?: ArticleStore;
}
