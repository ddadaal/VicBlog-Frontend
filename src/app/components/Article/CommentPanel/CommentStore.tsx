import { ArticleId } from "../../../models/Article";
import { NetworkStore } from "../../../stores/NetworkStore";
import { APIs } from "../../../api/ApiDefinition";
import { Comment } from "../../../models/Comment";

export class CommentStore {
  articleId: ArticleId;
  comments: Comment[];


  constructor(articleId: ArticleId) {
    this.articleId = articleId;
  }

  async load() {
    const url = NetworkStore.appendQueryString(APIs.comments, {articleId: this.articleId});
    const { ok, response } = await NetworkStore.fetch(url);
    if (ok) {
      this.comments = response.map(Comment.fromJson);
    }

}



}