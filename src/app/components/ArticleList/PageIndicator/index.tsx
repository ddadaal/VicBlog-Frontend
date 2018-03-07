import { ArticleListStoreProps } from "../../../stores/ArticleListStore";
import * as React from "react";
import style from '../../style';
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { ReactNode } from "react";

export function PageLink(props: { active: boolean, pageNumber: number, onClick: () => void, content?: ReactNode, disabled?: boolean }) {
  return <button disabled={props.disabled == undefined ? false : props.disabled}
                 onClick={props.onClick}
                 className={style("w3-button", {"w3-blue": props.active})}>
    {props.content == undefined ? props.pageNumber : props.content}
  </button>;
}

@inject(STORE_ARTICLE_LIST)
@observer
export class PageIndicator extends React.Component<ArticleListStoreProps, {}> {

  onClickProducer = (number: number) => {
    const store = this.props[STORE_ARTICLE_LIST];
    return () => {
      store.setPageNumber(number);
      store.fetchPage();
    }
  };

  toPreviousPage = () => {
    const store = this.props[STORE_ARTICLE_LIST];
    store.setPageNumber(store.currentPageNumber - 1);
    store.fetchPage();
  };

  toNextPage = () => {
    const store = this.props[STORE_ARTICLE_LIST];
    store.setPageNumber(store.currentPageNumber + 1);
    store.fetchPage();
  };

  constructLinks() {
    const store = this.props[STORE_ARTICLE_LIST];
    const result = [];
    for (let i = 1; i <= store.pageInfo.totalPageNumber; i++) {
      result.push(<PageLink key={i} active={i === store.nextPageNumber} pageNumber={i} onClick={this.onClickProducer(i)}/>)
    }
    return result;
  }


  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    return <div>
      <div className={style("w3-bar")}>
        <PageLink active={false} pageNumber={-1} onClick={this.toPreviousPage} content={<>&laquo;</>}
                  disabled={store.nextPageNumber === 1}/>
        {this.constructLinks()}
        <PageLink active={false} pageNumber={Number.POSITIVE_INFINITY} onClick={this.toNextPage} content={<>&raquo;</>}
                  disabled={store.nextPageNumber === store.pageInfo.totalPageNumber}/>
      </div>
    </div>;
  }
}
