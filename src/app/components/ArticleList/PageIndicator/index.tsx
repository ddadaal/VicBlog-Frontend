import React, { ReactNode } from "react";
import style from '../../style';
import { observer } from "mobx-react";
import { action } from "mobx";
import { ArticleListStore } from "../../../stores";
import { Inject } from "react.di";

export function PageLink(props: { active: boolean, pageNumber: number, onClick: () => void, content?: ReactNode, disabled?: boolean }) {
  return <button disabled={props.disabled == undefined ? false : props.disabled}
                 onClick={props.onClick}
                 className={style("w3-button", {"w3-blue": props.active})}>
    {props.content == undefined ? props.pageNumber : props.content}
  </button>;
}

@observer
export class PageIndicator extends React.Component<{}, {}> {

  @Inject articleListStore: ArticleListStore;

  onClickProducer = (number: number) => {
    const store = this.articleListStore;
    return action(() => {
      store.currentPageNumber = number;
      store.fetchPage();
    });
  };

  @action toPreviousPage = () => {
    const store = this.articleListStore;
    store.currentPageNumber--;
    store.fetchPage();
  };

  @action toNextPage = () => {
    const store = this.articleListStore;
    store.currentPageNumber++;
    store.fetchPage();
  };

  constructLinks() {
    const store = this.articleListStore;
    const result = [];
    for (let i = 1; i <= store.pageInfo.totalPageNumber; i++) {
      result.push(<PageLink key={i} active={i === store.currentPageNumber} pageNumber={i} onClick={this.onClickProducer(i)}/>)
    }
    return result;
  }


  render() {
    const store = this.articleListStore;
    return <div className={style("w3-center")}>
      <div className={style("w3-bar")}>
        <PageLink active={false} pageNumber={-1} onClick={this.toPreviousPage} content={<>&laquo;</>}
                  disabled={store.currentPageNumber === 1}/>
        {this.constructLinks()}
        <PageLink active={false} pageNumber={Number.POSITIVE_INFINITY} onClick={this.toNextPage} content={<>&raquo;</>}
                  disabled={store.currentPageNumber >= store.pageInfo.totalPageNumber}/>
      </div>
    </div>;
  }
}
