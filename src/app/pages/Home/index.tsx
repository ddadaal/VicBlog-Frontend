import React from "react";
import { ArticleListPageContent } from "../../components/ArticleList";
import style from "../../components/style";
import { ProfilePanel } from "../../components/ProfilePanel";
import { PageIndicator } from "../../components/ArticleList/PageIndicator";
// import { ArticleListFilterPanel } from "../../components/ArticleList/ArticleListFilterPanel";
import * as localStyle from './style.css';
import { ArticleFilter } from "../../models/ArticleFilter";
import { PageConfig } from "../index";
import { parseQueryString } from "../../api/utils";
import { TagSelector } from "../../components/ArticleListFilter/TagSelector";
import { OrderIndicator } from "../../components/ArticleList/OrderIndicator";

interface HomePageProps {
  params: HomePageParams;
}

export class HomePage extends React.Component<HomePageProps, any> {

  render() {
     return <div className={style("w3-row-padding", localStyle.container)}>
      <div className={style("w3-col", "l2", "s12", localStyle.left)}>
        <ProfilePanel/>
      </div>
      <div className={style("w3-col", "l8", "s12", localStyle.middle)}>
        <OrderIndicator/>
        <ArticleListPageContent filter={this.props.params.filter}/>
        <PageIndicator/>
      </div>
      <div className={style("w3-col", "l2", "s12", localStyle.right)}>
        <TagSelector/>
      </div>
    </div>
  }
}

export class HomePageParams {
  filter: ArticleFilter;

  constructor(params: string) {
    const paramObj = parseQueryString(params);
    this.filter = new ArticleFilter(paramObj);
  }

}

export const homePageConfig: PageConfig = {
  path: "/",
  render: async (props) => {
    const HomePage = (await import("./")).HomePage;
    return <HomePage params={new HomePageParams(props.location.search)}/>;
  },
  isThisPage: (pathname: string) => {
    return pathname === '/';
  },
  exact: true
};

