import { BaseService } from "./BaseService";
import { ArticleId } from "../models/Article";
import { HttpMethod } from "./utils";

const queryLikedRoute = "QueryLiked";

export class LikeService extends BaseService {

  private articleId: ArticleId;

  constructor(articleId: ArticleId) {
    super("Likes");
    this.articleId = articleId;
  }

  async fetchLikeCount() {
    const {statusCode, ok, error, response} = await this.fetch<number>({
      queryParams: {articleId: this.articleId}
    });
    if (ok) {
      return response;
    } else {
      throw error;
    }
  }

  async fetchLikeStatus(token: string) {

    const {ok, error, response} = await this.fetch({
      route: queryLikedRoute,
      queryParams: { articleId: this.articleId},
      token: token
    });

    if (ok) {
      return response.didLike as boolean;
    } else {
      throw error;
    }
  }

  async unlike(token: string) {
    const {ok, response, error} = await this.fetch<number>({
      queryParams: {articleId: this.articleId},
      method: HttpMethod.DELETE,
      token: token
    });

    if (ok) {
      return response;
    } else {
      throw error;
    }
  }

   async like(token: string) {
    const {ok, error, response} = await this.fetch<number>({
      method: HttpMethod.POST,
      queryParams: {articleId: this.articleId},
      token: token
    });
    if (ok) {
      return response;
    } else {
      throw error;
    }
  }
}
