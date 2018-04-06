import { Switch } from "react-router";
import React from "react";
import { AsyncPageConfig, PageConfig, RedirectPageConfig } from "./RouteConfig";


export const notFoundPageConfig: PageConfig = new AsyncPageConfig({
  path: "",
  render: async (props) => {
    const NotFoundPage = (await import("../pages/NotFound")).NotFoundPage;
    return <NotFoundPage/>;
  },
  exact: false
});

export const aboutPageConfig: PageConfig = new AsyncPageConfig({
  path: "/about",
  render: async (props) => {
    const AboutPage = (await import("../pages/About")).AboutPage;
    return <AboutPage/>;
  },
  exact: false,
});

export const articleListPageConfig: PageConfig = new AsyncPageConfig({
  path: "/articles",
  render: async () => {
    const Page = (await import("../pages/ArticleList")).ArticleListPage;
    return <Page/>;
  },
});


export const articlePageConfig: PageConfig = new AsyncPageConfig({
  path: "/articles/:id",
  render: async (props) => {
    const ArticlePage = (await import("../pages/ArticlePage")).ArticlePage;
    return <ArticlePage articleId={props.match.params.id}/>;
  },
});


export const homePageConfig: PageConfig = new AsyncPageConfig({
  path: "/",
  render: async (props) => {
    const HomePage = (await import("../pages/Home")).HomePage;
    return <HomePage/>;
  },
});

export const pageConfigs: PageConfig[] = [
  aboutPageConfig,
  homePageConfig,
  articleListPageConfig,
  articlePageConfig,
  notFoundPageConfig
];


export const switches = <Switch>
  {pageConfigs.map(x => x.construct())}
</Switch>;
