import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {getPage, Page} from "../pages";
import {action, computed} from "mobx";
import {AboutPage, HomePage, NotFoundPage} from "../pages/pages";

export class RouterStore extends BaseRouterStore {
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  @computed get currentPage(): Page {
    return getPage(this.location.pathname);
  }

  jumpTo = (path: string) => {
    this.push(path);
  };

  @action jumpToHome = () => {
    this.jumpTo(HomePage.path);
  };

  @action jumpToAbout = () => {
    this.jumpTo(AboutPage.path);
  };

  @action jumpToAboutMe = () => {
    console.log("clicked about me");
  };

  @action jumpTo404 = () => {
    this.jumpTo(NotFoundPage.path);
  };
}

export default RouterStore;
