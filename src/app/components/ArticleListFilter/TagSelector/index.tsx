import React from "react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { inject, observer } from "mobx-react";
import { ArticleListStoreProps } from "../../../stores/ArticleListStore";

@inject(STORE_ARTICLE_LIST)
@observer
export class TagSelector extends React.Component<ArticleListStoreProps, any> {
  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    return <div>
      {store.filter.tagsAsArray.map(x => <span key={x}>{x}</span>)}
    </div>;
  }
}
