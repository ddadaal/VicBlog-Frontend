export type ArticleId = number;

export class ArticleBrief {
  id: ArticleId;
  username: string;
  createTime: number;
  lastEditedTime: number;
  tags: string[];
  title: string;
  like: number;
  comment: number
}

export class Article extends ArticleBrief {
  content: string;
}