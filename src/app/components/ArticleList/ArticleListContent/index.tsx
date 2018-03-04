import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import * as React from "react";
import { inject, observer } from "mobx-react";
import { ArticleListStore } from "../../../stores";
import { ArticleList } from "../../../models/Article";
import { ArticleListItem } from "../ArticleListItem";
import { observable } from "mobx";

interface ArticleListContentProps {
  list: ArticleList
}



@observer
export class ArticleListContent extends React.Component<ArticleListContentProps, any> {

  render() {
    return <div>
      {this.props.list.list.map(x => <ArticleListItem key={x.articleId} brief={x}/>)}
    </div>;
  }
}
