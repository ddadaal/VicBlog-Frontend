import React from 'react';
import { CommentListLoading } from "./CommentListLoading";
import { CommentListFetchingError } from "./CommentListFetchingError";
import { CommentList } from "./CommentList";
import { FetchStatus } from "../../../../stores/common";
import { observer } from "mobx-react";
import { Comment } from "../../../../models/Comment";
import { PagingInfo } from "../../../../models/PagingInfo";

interface Props {
  submit(content: string): Promise<void>;
  remove(id: number) :Promise<void>;
  refresh(): void;
  fetchStatus: FetchStatus;
  list: Comment[];
  fetchPage(pageNumber: number): void;
  currentPageNumber: number;
  pagingInfo: PagingInfo;
}

export class CommentListContent extends React.Component<Props, {}> {



  render() {
    switch (this.props.fetchStatus) {
      case FetchStatus.NotStarted:
      case FetchStatus.Fetching:
        return <CommentListLoading/>;
      case FetchStatus.Error:
        return <CommentListFetchingError/>;
    }
    return <CommentList
      {...this.props}
    />
  }
}
