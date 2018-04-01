import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import React from "react";
import { inject, observer } from "mobx-react";
import { ArticleListItem } from "../ArticleListItem";
import { ArticleListStoreProps } from "../../../stores/ArticleListStore";
import { EmptyContent } from "./Empty";

interface ArticleListContentProps extends ArticleListStoreProps{
}


@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListContent extends React.Component<ArticleListContentProps, any> {



  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    if (store.listOfCurrentPage.length ==0) {
      return <EmptyContent/>;
    }
    return <div>
      {store.listOfCurrentPage.map(x => <ArticleListItem key={x.articleId} brief={x}/>)}
    </div>
  }
}
