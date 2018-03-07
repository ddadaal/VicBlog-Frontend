import * as React from "react";
import { ArticleListPageContent } from "../../components/ArticleList";
import style from "../../components/style";
import { ProfilePanel } from "../../components/ProfilePanel";
import { PageIndicator } from "../../components/ArticleList/PageIndicator";
import { ArticleListFilterPanel } from "../../components/ArticleList/ArticleListFilterPanel";
import * as localStyle from './style.css';

export class HomePage extends React.Component<any, any> {

  render() {
     return <div className={style("w3-row-padding", localStyle.container)}>
      <div className={style("w3-col", "l2", "s12", localStyle.left)}>
        <ProfilePanel/>
      </div>
      <div className={style("w3-col", "l8", "s12", localStyle.middle)}>
        <ArticleListPageContent/>
        <div className={style("w3-center")}>
          <PageIndicator/>
        </div>
      </div>
      <div className={style("w3-col", "l2", "s12", localStyle.right)}>
        <ArticleListFilterPanel/>
      </div>
    </div>
  }
}

