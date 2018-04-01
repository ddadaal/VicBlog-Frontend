import { ArticleListStoreProps } from "../../../stores/ArticleListStore";
import React from "react";
import { ReactNode } from "react";
import style from '../../style';
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { LocaleMessage } from "../../../internationalization/components";

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
      store.fetchPage(number);
    }
  };

  toPreviousPage = () => {
    const store = this.props[STORE_ARTICLE_LIST];
    store.fetchPage(store.currentPageNumber - 1);
  };

  toNextPage = () => {
    const store = this.props[STORE_ARTICLE_LIST];
    store.fetchPage(store.currentPageNumber + 1);
  };

  constructLinks() {
    const store = this.props[STORE_ARTICLE_LIST];
    const result = [];
    for (let i = 1; i <= store.pageInfo.totalPageNumber; i++) {
      result.push(<PageLink key={i} active={i === store.currentPageNumber} pageNumber={i} onClick={this.onClickProducer(i)}/>)
    }
    return result;
  }


  render() {
    const store = this.props[STORE_ARTICLE_LIST];
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
