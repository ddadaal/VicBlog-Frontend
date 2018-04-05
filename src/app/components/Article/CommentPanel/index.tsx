import React from "react";
import style from '../../style';
import { Header } from "./Header";
import { Inject } from "react.di";
import { CommentService } from "../../../api/CommentService";
import { ArticleId } from "../../../models/Article";
import { CommentStore } from "./CommentStore";
import { CommentListContent } from "./CommentListContent";
import { UserStore } from "../../../stores";

interface CommentPanelProps {
  articleId: ArticleId;
}

export class CommentPanel extends React.Component<CommentPanelProps> {

  @Inject commentService: CommentService;
  @Inject userStore: UserStore;

  commentStore: CommentStore = new CommentStore(this.commentService, this.props.articleId);

  render() {
    return <div className={style("w3-container")}>
      <Header/>
      <CommentListContent
        store={this.commentStore}
        userStore={this.userStore}
      />
    </div>
  }
}
