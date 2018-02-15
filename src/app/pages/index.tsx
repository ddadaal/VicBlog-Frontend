import * as React from 'react';
import { NotFoundPage, notFoundPageConfig } from "./NotFound";
import { RouteComponentProps } from "react-router";
import { aboutPageConfig } from "./About";
import { homePageConfig } from "./Home";
import { articleListPageConfig } from "./ArticleList";
import { articlePageConfig } from "./Article";
export { AboutPage, aboutPageConfig} from './About';
export { HomePage, homePageConfig } from './Home';
export { ArticleListPage, articleListPageConfig } from './ArticleList';

export interface PageConfig {
  isThisPage :(pathname: string) => boolean;
  path: string,
  render: (props: RouteComponentProps<any>) => JSX.Element,
  exact: boolean
}

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