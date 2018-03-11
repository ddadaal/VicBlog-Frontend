import { RouterStore } from "./RouterStore";
import { action, observable } from "mobx";
import { appendQueryString, parseQueryString } from "../api/utils";
import { STORE_ARTICLE_FILTER } from "../constants/stores";
import { ArticleFilter } from "../models/ArticleFilter";

export class ArticleFilterStore {
  private routerStore: RouterStore;

  constructor(routerStore: RouterStore) {
    this.routerStore = routerStore;
    this.filter = new ArticleFilter(parseQueryString(routerStore.location.search));
    console.log(this.filter);
  }

  @observable filter: ArticleFilter;


  private joinQuery(filter: ArticleFilter) {
    return appendQueryString("/", filter, true);
  }

  jointFilter() {
    this.routerStore.jumpTo(this.joinQuery(this.filter));
  }

  partialFilter(mapper: (filter: ArticleFilter) => ArticleFilter) {
    this.routerStore.jumpTo(this.joinQuery(mapper(this.filter)))
  }


}

export interface ArticleFilterStoreProps {
  [STORE_ARTICLE_FILTER]?: ArticleFilterStore
}
