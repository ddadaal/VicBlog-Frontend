import { ArticleId } from "./Article";
import { PagingInfo } from "./PagingInfo";

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

  constructor(json = {pageInfo: new PagingInfo(), list: []}) {
    this.pagingInfo = new PagingInfo(json.pageInfo);
    this.list = json.list;

  }
}

