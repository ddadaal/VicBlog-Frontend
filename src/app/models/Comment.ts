import { ArticleId } from "./Article";
import { PagingInfo } from "./PagingInfo";
import { ClassType } from "react";

export class Comment {
  id: number;
  articleId: ArticleId;
  username: string;
  submitTime: Date;
  content: string;

  constructor(json) {
    Object.assign(this, json);
    this.submitTime = new Date(json.submitTime);
  }
}

export class CommentList {
  pagingInfo: PagingInfo;
  list: Comment[];

  constructor(json = {pagingInfo: new PagingInfo(), list: []}) {
    this.pagingInfo = new PagingInfo(json.pagingInfo);
    this.list = json.list;

  }
}

