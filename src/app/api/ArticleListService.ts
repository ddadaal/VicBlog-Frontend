import { BaseService } from "./BaseService";
import { ArticleListFetchErrorType, ArticleListOrder } from "../stores/ArticleListStore";
import { ArticleFilter } from "../models/ArticleFilter";
import { ArticleList } from "../models/Article";

export class ArticleListService extends BaseService {

  constructor() {
    super("Articles");
  }

  async fetchArticleList(pageSize: number, pageNumber: number, filter: ArticleFilter, order: ArticleListOrder): Promise<ArticleList> {
    const { response, error, ok } = await this.fetch({
      queryParams: {...filter, order: order, pageNumber: pageNumber, pageSize: pageSize},
    });

    if (ok) {
      return ArticleList.fromJson(response);
    } else if (error.isNetworkError) {
      throw {type: ArticleListFetchErrorType.NetworkError, error: error.info};
    } else if (error.isServerError) {
      throw { type: ArticleListFetchErrorType.ServerError};
    } else {
      throw {type: ArticleListFetchErrorType.Unknown};
    }
  }

}
