import * as React from "react";
import style from '../../components/style';
import { ArticleList } from "../../components/ArticleList";

export class ArticleListPage extends React.Component<any, any> {

  render() {
    return <div className={style("w3-container","w3-row")}>
      <div className={style("w3-col","m3","w3-mobile")}>
        <p>Filter</p>
      </div>
      <div className={style("w3-rest","w3-mobile")}>
        <ArticleList/>
      </div>
    </div>
  }
}

