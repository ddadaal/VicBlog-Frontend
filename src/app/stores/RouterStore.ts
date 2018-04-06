import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { action } from "mobx";
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
}
