import React from "react";
import { observer } from "mobx-react";
import { ArticleListItem } from "../ArticleListItem";
import { EmptyContent } from "./Empty";
import { Inject } from "react.di";
import { ArticleListStore } from "../../../stores";

interface ArticleListContentProps {
}


@observer
export class ArticleListContent extends React.Component<ArticleListContentProps, any> {

  @Inject articleListStore: ArticleListStore;

  render() {
    if (this.articleListStore.listOfCurrentPage.length ==0) {
      return <EmptyContent/>;
    }
    return <div>
      {this.articleListStore.listOfCurrentPage.map(x => <ArticleListItem key={x.articleId} brief={x}/>)}
    </div>
  }
}
