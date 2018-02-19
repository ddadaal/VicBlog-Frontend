import * as React from "react";
import { STORE_ARTICLE_LIST, STORE_ROUTER } from "../../constants/stores";
import { ArticleListFetchState, ArticleListStore } from "../../stores/ArticleListStore";
import { inject, observer } from "mobx-react";
import style from '../style';
import { LocaleMessage } from "../../internationalization";
import { ArticleListItem } from "./ArticleListItem";

interface ArticleListProps {
  [STORE_ARTICLE_LIST]?: ArticleListStore
}

@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleList extends React.Component<ArticleListProps, any> {

  loadingComponent = <div className={style("w3-container")}>
    <h3><LocaleMessage id={"articleList.loading"}/></h3>
  </div>;

  render() {
    const articleList = this.props[STORE_ARTICLE_LIST];
    switch (articleList.fetchState) {
      case ArticleListFetchState.Standby:
        articleList.startFetch();
        return this.loadingComponent;
      case ArticleListFetchState.Fetching:
        return this.loadingComponent;
    }
    // fetched
    console.log("fetched");
    return <div className={style("w3-container")}>
      {articleList.list.map(x => <ArticleListItem brief={x} key={x.id}/>)}
    </div>
  }
}