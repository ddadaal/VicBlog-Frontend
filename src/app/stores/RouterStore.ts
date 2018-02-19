import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {
  aboutPageConfig, articleListPageConfig, getPage, homePageConfig, notFoundPageConfig,
  PageConfig
} from "../pages";
import {action, computed} from "mobx";

export class RouterStore extends BaseRouterStore {
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  @computed get currentPage(): PageConfig {
    return getPage(this.location.pathname);
  }

  @action jumpTo = (path: string) => {
    this.push(path);
  };

  @action jumpToArticleList = () => {
    this.jumpTo(articleListPageConfig.path)
  };

  @action jumpToHome = () => {
    this.jumpTo(homePageConfig.path);
  };

  @action jumpToAbout = () => {
    this.jumpTo(aboutPageConfig.path);
  };

  @action jumpToAboutMe = () => {
    console.log("clicked about me");
  };

  @action jumpTo404 = () => {
    this.jumpTo(notFoundPageConfig.path);
  };
}