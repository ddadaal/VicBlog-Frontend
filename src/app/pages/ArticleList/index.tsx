import * as React from "react";
import style from '../../components/style';
import * as localStyle from './styles.css';
import * as classNames from 'classnames';
import { ArticleList } from "../../components/ArticleList";
import { ArticleListFilter } from "../../components/ArticleList/ArticleListFilter";

export class ArticleListPage extends React.Component<any, any> {

  render() {
    return <div className={classNames(style("w3-container","w3-row"), localStyle.container)}>
      <div className={classNames(style("w3-col","m3","w3-mobile"), localStyle.left)}>
        <ArticleListFilter/>
      </div>
      <div className={classNames(style("w3-rest","w3-mobile"), localStyle.right)}>
        <ArticleList/>
      </div>
    </div>
  }
}

