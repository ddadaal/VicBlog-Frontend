import * as React from 'react';
import { RouteComponentProps } from "react-router";

export interface PageConfig {
  isThisPage :(pathname: string) => boolean;
  path: string,
  render: (props: RouteComponentProps<any>) => Promise<JSX.Element>,
  exact: boolean
}


export const notFoundPageConfig: PageConfig =  {
  path: "",
  isThisPage: (pathname: string) => true,
  render: async (props) => {
    const NotFoundPage = (await import("./NotFound")).NotFoundPage;
    return <NotFoundPage/>;
  },
  exact: false
};

export const articlePageConfig: PageConfig = {
  path: "/articles/:id",
  render: async (props) => {
    const ArticlePage = (await import("./ArticlePage")).ArticlePage;
    return <ArticlePage articleId={props.match.params.id}/>;
  },
  isThisPage(pathname: string): boolean {
    return pathname.match("/articles/[0-9]+") != null;
  },
  exact: true
};

export const articleListPageConfig: PageConfig = {
  isThisPage: (pathname: string): boolean => {
    return pathname === "/articles";
  },
  render: async (props) => {
    const ArticleListPage = (await import("./ArticleList")).ArticleListPage;
    return <ArticleListPage/>;
  },
  path: "/articles",
  exact: true
};

export const homePageConfig: PageConfig = {
  path: "/",
  render: async (props) => {
    const HomePage = (await import("./Home")).HomePage;
    return <HomePage/>;
  },
  isThisPage: (pathname: string) => {
    return pathname === '/';
  },
  exact: true
};

export const aboutPageConfig: PageConfig = {
  path: "/about",
  render: async (props) => {
    const AboutPage = (await import("./About")).AboutPage;
    return <AboutPage/>;
  },
  isThisPage: (pathname: string): boolean => {
    return pathname.startsWith("/about");
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

export function getPage(pathname: string) {
  for (const p of pageConfigs) {
    if (p.isThisPage(pathname)) {
      return p;
    }
  }
  return notFoundPageConfig;
}