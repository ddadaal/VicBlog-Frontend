import React from 'react';
import { ArticleListPageContent } from "../../components/ArticleList";
import { PageIndicator } from "../../components/ArticleList/PageIndicator";
import { OrderIndicator } from "../../components/ArticleListFilter/OrderIndicator";
import style from "../../components/style";
import { TitleSearchBar } from "../../components/ArticleListFilter/TitleSearchBar";
import { TagSelector } from "../../components/ArticleListFilter/TagSelector";
import * as localStyle from './style.css';

interface Props {

}

export class ArticleListPage extends React.Component<Props, {}> {
  render() {
    return <div className={style("w3-row-padding", localStyle.container)}>
      <div className={style("w3-col", "l3", "s12", "w3-margin-top", localStyle.left, localStyle.parent)}>
        <OrderIndicator/>
        <TitleSearchBar/>
        <TagSelector/>
      </div>
      <div className={style("w3-col", "l9", "s12", "w3-padding", localStyle.right)}>
        <ArticleListPageContent/>
      </div>
      <div className={style(localStyle.pageIndicator)}>
        <PageIndicator/>
      </div>
    </div>
  }
}
