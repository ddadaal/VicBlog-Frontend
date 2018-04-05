import React from 'react';
import { CommentStore } from "../CommentStore";
import { CommentListLoading } from "./CommentListLoading";
import { CommentListFetchingError } from "./CommentListFetchingError";
import { CommentList } from "./CommentList";
import { UserStore } from "../../../../stores";
import { FetchStatus } from "../../../../stores/common";
import { observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";

interface Props {
  store: CommentStore;
  userStore: UserStore;
}

@observer
export class CommentListContent extends React.Component<Props, {}> {

  submitComment = async (content: string) => {
    await this.props.store.submitComment(content, this.props.userStore.token);
  };

  refresh = () => {
    this.props.store.expire();
    this.props.store.fetchPage();
  };

  removeComment = async (id: number) => {
    await this.props.store.removeComment(id, this.props.userStore.token);
  };

  render() {
    switch (this.props.store.fetchStatus) {
      case FetchStatus.NotStarted:
      case FetchStatus.Fetching:
        return <CommentListLoading/>;
      case FetchStatus.Error:
        return <CommentListFetchingError/>;
    }
    return <CommentList
      list={this.props.store.listOfCurrentPage}
      submit={this.submitComment}
      remove={this.removeComment}
      refresh={this.refresh}
    />
  }
}
