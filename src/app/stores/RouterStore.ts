import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { action, computed } from "mobx";
import { STORE_ROUTER } from "../constants/stores";
import { getPage, PageConfig } from "../pages";
import { homePageConfig } from "../pages/Home";
import { aboutPageConfig } from "../pages/About";
import { notFoundPageConfig } from "../pages/NotFound";

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

export interface RouterStoreProps {
  [STORE_ROUTER]?: RouterStore
}
