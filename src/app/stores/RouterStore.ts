import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { action } from "mobx";
import { aboutPageConfig, homePageConfig, notFoundPageConfig } from "../pages/routes";
import { Injectable } from "react.di";

@Injectable
export class RouterStore extends BaseRouterStore {
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
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
