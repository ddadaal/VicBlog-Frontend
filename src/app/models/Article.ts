export type ArticleId = number;

export class ArticleBrief {
  id: ArticleId;
  username: string;
  createTime: number;
  lastEditedTime: number;
  tags: string[];
  title: string;
  likeCount: number;
  commentCount: number
}

export class Article {
  id: ArticleId;
  username: string;
  createTime: number;
  lastEditedTime: number;
  tags: string[];
  title: string;
  likeCount: number;
  content: string;
}