import React from "react";
import { STORE_ARTICLE_FILTER } from "../../../constants/stores";
import { ArticleFilterStoreProps } from "../../../stores/ArticleFilterStore";
import { inject, observer } from "mobx-react";

@inject(STORE_ARTICLE_FILTER)
@observer
export class TagSelector extends React.Component<ArticleFilterStoreProps, any> {
  render() {
    const store = this.props[STORE_ARTICLE_FILTER];
    return <div>
      {store.filter.tagsAsArray.map(x => <span key={x}>{x}</span>)}
    </div>;
  }
}
