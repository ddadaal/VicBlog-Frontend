import { PagingInfo } from "./PagingInfo";

export type ArticleId = number;

export class ArticleList {

  pagingInfo: PagingInfo;
  list: ArticleBrief[];

  static fromJson(json: ClassType<ArticleList>) {
    const list = new ArticleList();

    list.pagingInfo = PagingInfo.fromJson(json.pagingInfo);
    list.list = json.list.map(ArticleBrief.fromJson);
    return list;
  }

  static get newInstance() {
    return ArticleList.fromJson({
      pagingInfo: PagingInfo.newInstance,
      list: []
    });
  }
}

export class ArticleBrief {
  articleId: ArticleId;
  author: string;
  createTime: Date;
  lastEditedTime: Date;
  tags: string[];
  title: string;
  likeCount: number;
  commentCount: number;

  static fromJson(json: any) {
    const brief = Object.assign(new ArticleBrief(), json);
    brief.createTime = new Date(brief.createTime);
    brief.lastEditedTime = new Date(brief.lastEditedTime);
    return brief;
  }
}

export class Article {
  articleId: ArticleId;
  author: string;
  createTime: Date;
  lastEditedTime: Date;
  tags: string[];
  title: string;
  content: string;

  static fromJson(json: any) {
    const article = Object.assign(new ArticleBrief(), json);
    article.createTime = new Date(article.createTime);
    article.lastEditedTime = new Date(article.lastEditedTime);
    return article;
  }
}
