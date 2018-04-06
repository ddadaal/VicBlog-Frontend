import React, { ReactNode } from "react";
import style from '../../style';
import { observer } from "mobx-react";
import { action } from "mobx";
import { ArticleListStore } from "../../../stores";
import { Inject } from "react.di";
import { PageIndicator } from "../../Common/PageIndicator";

@observer
export class ArticleListPageIndicator extends React.Component<{}, {}> {

  @Inject articleListStore: ArticleListStore;

  @action fetchPage = (pageNumber: number) => {
    this.articleListStore.currentPageNumber = pageNumber;
    this.articleListStore.fetchPage();
  };


  render() {
    const store = this.articleListStore;
    return <PageIndicator fetchPage={this.fetchPage}
                          pagingInfo={store.pagingInfo}
                          currentPageNumber={store.currentPageNumber} />;
  }
}
