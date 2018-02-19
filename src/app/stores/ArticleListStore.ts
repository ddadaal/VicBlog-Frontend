import { action, computed, isObservableArray, observable } from "mobx";
import { ArticleBrief } from "../models/Article";

export enum ArticleListFetchState {
  Standby, Fetching, Fetched
}

export class ArticleListStore {
  list: ArticleBrief[] = [];
  lastUpdated: Date;
  @observable fetchState: ArticleListFetchState = ArticleListFetchState.Standby;

  @computed get fetched() {
    return this.fetchState === ArticleListFetchState.Fetched;
  }

  pushMockBriefs(num: number) {
    for (let i =0;i<num;i++) {
      let mock = new ArticleBrief();
      mock.id = i;
      mock.title = "mock" + i;
      mock.tags = ["tag1","tag2"];
      mock.lastEditedTime = Date.now();
      mock.createTime = Date.now();
      mock.like = i;
      mock.comment = i;
      this.list.push(mock);
    }
  }

  @action startFetch = () => {
    // this.fetchState = ArticleListFetchState.Fetching;
    this.fetchState = ArticleListFetchState.Fetching;
    this.pushMockBriefs(5);
    this.fetchState = ArticleListFetchState.Fetched;

  };

}