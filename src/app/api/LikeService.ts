import { HttpService } from "./HttpService";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";

@Injectable
export class LikeService {

  constructor(@Inject private http: HttpService) {

  }

  async fetchLikeCount(articleId: number) {
    const {statusCode, ok, error, response} = await this.http.fetch<number>({
      path: "/Likes",
      queryParams: {articleId}
    });
    if (ok) {
      return response;
    } else {
      throw error;
    }
  }

  async fetchLikeStatus(articleId: number, token: string) {

    const {ok, error, response} = await this.http.fetch({
      path: "/Likes/QueryLiked",
      queryParams: { articleId},
      token: token
    });

    if (ok) {
      return response.didLike as boolean;
    } else {
      throw error;
    }
  }

  async unlike(articleId: number, token: string) {
    const {ok, response, error} = await this.http.fetch<number>({
      path: "/Likes",
      queryParams: {articleId},
      method: HttpMethod.DELETE,
      token: token
    });

    if (ok) {
      return response;
    } else {
      throw error;
    }
  }

   async like(articleId: number, token: string) {
    const {ok, error, response} = await this.http.fetch<number>({
      method: HttpMethod.POST,
      queryParams: {articleId},
      token: token
    });
    if (ok) {
      return response;
    } else {
      throw error;
    }
  }
}
