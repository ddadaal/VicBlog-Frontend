import React from "react";
import style from '../../style';
import { Header } from "./Header";
import { Inject } from "react.di";
import { CommentService } from "../../../api/CommentService";
import { ArticleId } from "../../../models/Article";
import { CommentStore } from "./CommentStore";
import { CommentListContent } from "./CommentListContent";
import { UserStore } from "../../../stores";
import { observer } from "mobx-react";
import { FetchStatus } from "../../../stores/common";
import { action } from "mobx";

interface CommentPanelProps {
  articleId: ArticleId;
}

@observer
export class CommentPanel extends React.Component<CommentPanelProps> {

  @Inject commentService: CommentService;
  @Inject userStore: UserStore;

  commentStore: CommentStore = new CommentStore(this.commentService, this.props.articleId);

  submitComment = async (content: string) => {
    await this.commentStore.submitComment(content, this.userStore.token);
  };

  removeComment = async (id: number) => {
    await this.commentStore.removeComment(id, this.userStore.token);
  };

  refresh = () => {
    this.commentStore.expire();
    this.commentStore.fetchPage();
  };

  @action fetchPage = (pageNumber: number) => {
    this.commentStore.currentPageNumber = pageNumber;
    this.commentStore.fetchPage();
  };


  render() {
    return <div className={style("w3-container")}>
      <Header
        refresh={this.refresh}
        totalContent={this.commentStore.pagingInfo.totalCount}
        refreshing={this.commentStore.fetchStatus === FetchStatus.Fetching}
      />
      <CommentListContent
        submit={this.submitComment}
        remove={this.removeComment}
        refresh={this.refresh}
        list={this.commentStore.listOfCurrentPage}
        fetchStatus={this.commentStore.fetchStatus}
        fetchPage={this.fetchPage}
        pagingInfo={this.commentStore.pagingInfo}
        currentPageNumber={this.commentStore.currentPageNumber}
      />
    </div>
  }
}
