import React from 'react';
import { ArticleListPageContent } from "../../components/ArticleList";
import { ArticleListPageIndicator } from "../../components/ArticleList/ArticleListPageIndicator";
import { OrderIndicator } from "../../components/ArticleListFilter/OrderIndicator";
import style from "../../components/style";
import { TitleSearchBar } from "../../components/ArticleListFilter/TitleSearchBar";
import { TagSelector } from "../../components/ArticleListFilter/TagSelector";
import * as localStyle from './style.css';
import { ui } from "../../stores/UiUtil";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { LocalizedDocumentTitle } from "../../internationalization/components/LocalizedDocumentTitle";

interface Props {

}

export class ArticleListPage extends React.Component<Props, {}> {

  render() {
    return <LocalizedDocumentTitle formatId={"articleList.documentTitle"}>
      <div className={style("w3-row-padding", localStyle.container)}>
        <div className={style("w3-col", "l3", "s12", "w3-margin-top", localStyle.left, localStyle.parent)}>
          <OrderIndicator/>
          <TitleSearchBar/>
          <TagSelector/>
        </div>
        <div className={style("w3-col", "l9", "s12", "w3-padding", localStyle.right)}>
          <ArticleListPageContent/>
        </div>
        <div className={style(localStyle.pageIndicator)}>
          <ArticleListPageIndicator/>
        </div>
      </div>
    </LocalizedDocumentTitle>;
  }
}
