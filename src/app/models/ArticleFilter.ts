import { computed, observable, toJS } from "mobx";

export class ArticleFilter {
  @observable tags: string[] = [];

  @observable titleText: string = "";

  get queryParams() {
    const obj = {
      tags: this.tags.length >0 ? toJS(this.tags) : null,
      titleText: this.titleText || null
    };

    return Object.keys(obj)
      .filter(key => obj[key])
      .reduce((prev, curr) => ({...prev, [curr]: obj[curr]}), {});
  }

}
