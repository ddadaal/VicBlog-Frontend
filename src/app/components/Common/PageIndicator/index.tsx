import React from 'react';
import style from "../../style";
import { PagingInfo } from "../../../models/PagingInfo";
import { PageLink } from "./PageLink";



interface Props {
  fetchPage(pageNumber: number): void;
  currentPageNumber: number;
  pagingInfo: PagingInfo;
}

export class PageIndicator extends React.Component<Props, {}> {
  onClickProducer = (number: number) => () => {
    this.props.fetchPage(number);
  };

  toPreviousPage = () => {
    this.onClickProducer(this.props.currentPageNumber-1)();
  };

  toNextPage = () => {
    this.onClickProducer(this.props.currentPageNumber+1)();
  };

  constructLinks() {
    const result = [];
    for (let i = 1; i <= this.props.pagingInfo.totalPageNumber; i++) {
      result.push(<PageLink key={i}
                            active={i === this.props.currentPageNumber}
                            pageNumber={i}
                            onClick={this.onClickProducer(i)}/>)
    }
    return result;
  }


  render() {
    return <div className={style("w3-center")}>
      <div className={style("w3-bar")}>
        <PageLink active={false} pageNumber={-1} onClick={this.toPreviousPage} content={<>&laquo;</>}
                  disabled={this.props.currentPageNumber === 1}/>
        {this.constructLinks()}
        <PageLink active={false} pageNumber={Number.POSITIVE_INFINITY} onClick={this.toNextPage} content={<>&raquo;</>}
                  disabled={this.props.currentPageNumber >= this.props.pagingInfo.totalPageNumber}/>
      </div>
    </div>;
  }
}
