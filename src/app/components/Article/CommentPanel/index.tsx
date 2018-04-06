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
import { ContentPanel } from "../../Common/ContentPanel";

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

  refresh = async () => {
    this.commentStore.expire();
    await this.commentStore.fetchPage();
  };

  @action fetchPage = (pageNumber: number) => {
    this.commentStore.currentPageNumber = pageNumber;
    this.commentStore.fetchPage();
  };


  render() {
    return <ContentPanel className={style("w3-container")}
                         title={<Header totalContent={this.commentStore.pagingInfo.totalCount}
                                        refresh={this.refresh}
                                        refreshing={this.commentStore.fetchStatus === FetchStatus.Fetching}/>}>
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
    </ContentPanel>;
  }
}
