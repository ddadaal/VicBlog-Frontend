import * as React from "react";
import { HomePage as hp, AboutPage as ap,NotFoundPage as nfp } from './';

export interface Page {
  isThisPage :(pathname: string) => boolean;
  path: string,
  component: any

}

export const HomePage: Page = {
  path: "/",
  component: hp,
  isThisPage: (pathname: string) => {
    return pathname === '/';
  }
};

export const AboutPage: Page = {
  path: "/about",
  component: ap,
  isThisPage: (pathname: string): boolean => {
    return pathname.startsWith("/about");
  }
};

// export class ArticlePage extends Page {
//   public isThisPage(pathname: string): boolean {
//     return pathname.match("/articles/[0-9a-zA-Z]+") != null;
//   }
//
// }
// export class ArticleListPage extends Page {
//   public isThisPage(pathname: string): boolean {
//     return pathname === "/articles";
//   }
// }

export const NotFoundPage : Page = {
  path: "",
  component: nfp,
  isThisPage: (pathname: string): boolean => {
    return true;
  }
};

export const pages: Page[] = [AboutPage, HomePage, NotFoundPage];

export function getPage(pathname: string) {
  for (let p of pages) {
    if (p.isThisPage(pathname)) {
      return p;
    }
  }
  return NotFoundPage;
}