import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { ArticleId } from "../models/Article";
import { CommentList } from "../models/Comment";
import { HttpMethod } from "./utils";

export const enum CommentListFetchErrorType {
  NetworkError,
  ServerError,
  Unknown
}

export interface CommentListFetchError {
  type: CommentListFetchErrorType
}

export interface CommentListFetchNetworkError extends CommentListFetchError {
  type: CommentListFetchErrorType.NetworkError;
  error: any;
}

@Injectable
export class CommentService {
  constructor(@Inject private http: HttpService) { }

  async fetchComments(articleId: ArticleId, pageSize: number, pageNumber: number): Promise<CommentList> {
    const { response, error, ok} = await this.http.fetch({
      path: "/Comments",
      queryParams: { articleId, pageSize, pageNumber }
    });

    if (ok) {
      return new CommentList(response);
    } else if (error.isNetworkError) {
      throw { type: CommentListFetchErrorType.NetworkError, error: error.info};
    } else if (error.isServerError) {
      throw { type: CommentListFetchErrorType.ServerError};
    } else {
      throw { type: CommentListFetchErrorType.Unknown};
    }
  }

  async submitComment(articleId: number, content: string, token: string) {
    const { response, error, ok} = await this.http.fetch({
      path: "/Comments",
      method: HttpMethod.POST,
      queryParams: {articleId},
      body: { content },
      token
    });

    if (ok) {

    } else if (error.isNetworkError) {
      throw { type: CommentListFetchErrorType.NetworkError, error: error.info};
    } else if (error.isServerError) {
      throw { type: CommentListFetchErrorType.ServerError};
    } else {
      throw { type: CommentListFetchErrorType.Unknown};
    }
  }

  async removeComment(commentId: number, token: string) {
    const { response, error, ok} = await this.http.fetch({
      path: "/Comments",
      method: HttpMethod.DELETE,
      queryParams: {commentId},
      token
    });

    if (ok) {

    } else if (error.isNetworkError) {
      throw { type: CommentListFetchErrorType.NetworkError, error: error.info};
    } else if (error.isServerError) {
      throw { type: CommentListFetchErrorType.ServerError};
    } else {
      throw { type: CommentListFetchErrorType.Unknown};
    }
  }
}
