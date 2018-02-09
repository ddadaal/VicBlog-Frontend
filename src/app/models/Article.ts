export class ArticleBrief {
  id: string;
  username: string;
  submitTime: number;
  lastEditedTime: number;
  category: string;
  tags: string[];
  title: string;
  rate: number;

}

export class Article extends ArticleBrief {
  content: string;
}