import { ArticleId } from "./Article";

export class Comment {
  id: number;
  articleId: ArticleId;
  username: string;
  submitTime: Date;
  content: string;

  static fromJson(json) {
    const comment = Object.assign(new Comment(), json);
    comment.submitTime = new Date(json.submitTime);
    return comment;
  }
}
