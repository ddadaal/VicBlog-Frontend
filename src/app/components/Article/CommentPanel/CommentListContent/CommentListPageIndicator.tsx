import React from 'react';
import { CommentStore } from "../CommentStore";
import { PagingInfo } from "../../../../models/PagingInfo";
import { PageIndicator } from "../../../Common/PageIndicator";

interface Props {
  fetchPage(pageNumber: number): void;
  currentPageNumber: number;
  pagingInfo: PagingInfo;
}

export class CommentListPageIndicator extends React.Component<Props, {}> {
  render() {
    return <PageIndicator {...this.props}/>
  }
}
