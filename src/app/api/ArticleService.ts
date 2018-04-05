import { HttpService } from "./HttpService";
import { Article } from "../models";
import { Inject, Injectable } from "react.di";

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


@Injectable
export class ArticleService {

  constructor(@Inject private http: HttpService) {
  }

  async fetchArticle(id: number): Promise<Article> {

    const {statusCode, response, error, ok} = await this.http.fetch({
      path: `/Articles/${id}`
    });

    if (ok) {
      return  new Article(response);
    } else if (error.isServerError) {
      throw { type: ArticleFetchErrorType.ServerError};
    } else if (error.isNetworkError) {
      throw {type: ArticleFetchErrorType.NetworkError, error: error}
    } else if (statusCode === 404) {
      throw {type: ArticleFetchErrorType.NotFound};
    } else {
      throw {type: ArticleFetchErrorType.Unknown}
    }
  }
}
