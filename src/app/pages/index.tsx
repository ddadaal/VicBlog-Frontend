import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { homePageConfig } from "./Home";
import { aboutPageConfig } from "./About";
import { articlePageConfig } from "./ArticlePage";
import { notFoundPageConfig } from "./NotFound";

export interface PageConfig {
  isThisPage :(pathname: string) => boolean;
  path: string,
  render: (props: RouteComponentProps<any>) => Promise<JSX.Element>,
  exact: boolean
}

export const pageConfigs: PageConfig[] = [
  aboutPageConfig,
  homePageConfig,
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
