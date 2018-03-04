import * as React from "react";
import { STORE_ARTICLE_LIST } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import style from '../style';
import * as localStyle from './style.css';
import { ArticleList } from "../../models/Article";
import { ArticleListFilter } from "./ArticleListFilter";
import { ArticleListContent } from "./ArticleListContent";
import { observable } from "mobx";

interface ArticleListPageContentProps {
  articleList: ArticleList;
  lastUpdateTime: Date;
  tags: string[];
  refresh: () => void
}


@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListPageContent extends React.Component<ArticleListPageContentProps, any> {

  @observable title: string = "";
  @observable tags: string[] = [];



  render() {
    return <div className={style("w3-row",localStyle.container)}>
      <div className={style("w3-col","m3","w3-mobile", localStyle.left)}>
        <ArticleListFilter tags={this.props.tags}/>
      </div>
      <div className={style("w3-rest","w3-mobile", localStyle.right)}>
        <ArticleListContent list={this.props.articleList} />
      </div>
    </div>
  }
}