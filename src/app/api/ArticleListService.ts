import { HttpService } from "./HttpService";
import { ArticleFilter } from "../models/ArticleFilter";
import { ArticleList } from "../models/Article";
import { Inject, Injectable } from "react.di";

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

@Injectable
export class ArticleListService {

  constructor(@Inject private http: HttpService) {

  }

  async fetchArticleList(pageSize: number, pageNumber: number, filter: ArticleFilter, order: ArticleListOrder): Promise<ArticleList> {

    const { response, error, ok } = await this.http.fetch({
      path: "/Articles",
      queryParams: {...(filter.queryParams), order: order, pageNumber: pageNumber, pageSize: pageSize},
    });


    if (ok) {
      return new ArticleList(response);
    } else if (error.isNetworkError) {
      throw {type: ArticleListFetchErrorType.NetworkError, error: error.info};
    } else if (error.isServerError) {
      throw { type: ArticleListFetchErrorType.ServerError};
    } else {
      throw {type: ArticleListFetchErrorType.Unknown};
    }
  }

  async fetchTags() {
    const { response, error, ok} = await this.http.fetch({
      path: "/Articles/Tags",
    });

    if (ok) {
      return response as string[];
    } else {
      throw "error";
    }
  }

}
