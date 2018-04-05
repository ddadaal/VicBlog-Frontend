import { PagingInfo } from "./PagingInfo";

export type ArticleId = number;

export class ArticleList {

  pagingInfo: PagingInfo;
  list: ArticleBrief[];

  constructor(json) {
    this.pagingInfo = new PagingInfo(json.pagingInfo);
    this.list = json.list.map(x => new ArticleBrief(x));
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


  constructor(json) {
    Object.assign(this, json);
    this.createTime = new Date(json.createTime);
    this.lastEditedTime = new Date(json.lastEditedTime);
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

  constructor(json) {
    Object.assign(this, json);
    this.createTime = new Date(json.createTime);
    this.lastEditedTime = new Date(json.lastEditedTime);
  }
}
