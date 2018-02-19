import * as React from "react";
import style from '../../components/style';
import { PageConfig } from "../index";
import { ArticleList } from "../../components/ArticleList";

export class ArticleListPage extends React.Component<any, any> {

  render() {
    return <div className={style("w3-container","w3-row")}>
      <div className={style("w3-third")}>
        <p>Filter</p>
      </div>
      <div className={style("w3-twothird")}>
        <ArticleList/>
      </div>
    </div>
  }
}

