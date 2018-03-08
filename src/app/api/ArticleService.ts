import { BaseService } from "./BaseService";
import { ArticleFetchErrorType, FetchedArticle } from "../stores/ArticleStore";
import { Article } from "../models";
import * as moment from "moment";

export class ArticleService extends BaseService {
  constructor() {
    super("Articles");
  }

  async fetchArticle(id: number): Promise<FetchedArticle> {

    const {statusCode, response, error, ok} = await this.fetch({
      route: id+""
    });

    if (ok) {
      return {
        fetchTime: moment(),
        article: Article.fromJson(response)
      };
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
