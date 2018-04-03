import React from "react";
import { RouteComponentProps } from "react-router";


export interface PageConfig {
  path: string,
  render: (props: RouteComponentProps<any>) => Promise<JSX.Element>,
  exact: boolean
}



export const notFoundPageConfig: PageConfig =  {
  path: "",
  render: async (props) => {
    const NotFoundPage = (await import("./NotFound")).NotFoundPage;
    return <NotFoundPage/>;
  },
  exact: false
};

export const aboutPageConfig: PageConfig = {
  path: "/about",
  render: async (props) => {
    const AboutPage = (await import("./About")).AboutPage;
    return <AboutPage/>;
  },
  exact: true
};

export const articleListPageConfig: PageConfig = {
  path: "/articles",
  render: async () => {
    const Page = (await import("./ArticleList")).ArticleListPage;
    return <Page/>;
  },
  exact: true
};


export const articlePageConfig: PageConfig = {
  path: "/articles/:id",
  render: async (props) => {
    const ArticlePage = (await import("./ArticlePage")).ArticlePage;
    return <ArticlePage articleId={props.match.params.id}/>;
  },
  exact: true
};


export const homePageConfig: PageConfig = {
  path: "/",
  render: async (props) => {
    const HomePage = (await import("./Home")).HomePage;
    return <HomePage/>;
  },
  exact: true
};

export const pageConfigs: PageConfig[] = [
  aboutPageConfig,
  homePageConfig,
  articleListPageConfig,
  articlePageConfig,
  notFoundPageConfig
];
