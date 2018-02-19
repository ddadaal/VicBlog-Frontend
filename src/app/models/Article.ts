export class ArticleBrief {
  id: number;
  username: string;
  createTime: number;
  lastEditedTime: number;
  tags: string[];
  title: string;
  like: number;

}

export class Article extends ArticleBrief {
  content: string;
}