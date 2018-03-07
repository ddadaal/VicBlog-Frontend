import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import * as React from "react";
import { inject, observer } from "mobx-react";
import { ArticleListStore } from "../../../stores";
import { ArticleBrief, ArticleList } from "../../../models/Article";
import { ArticleListItem } from "../ArticleListItem";
import { observable } from "mobx";
import { AsyncComponent } from "../../../routes/AsyncComponent";
import { ArticleListStoreProps } from "../../../stores/ArticleListStore";
import { PageIndicator } from "../PageIndicator";

interface ArticleListContentProps extends ArticleListStoreProps{
}


@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListContent extends React.Component<ArticleListContentProps, any> {


  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    return <div>
      {store.listOfCurrentPage.map(x => <ArticleListItem key={x.articleId} brief={x}/>)}
    </div>
  }
}
