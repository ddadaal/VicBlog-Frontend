import React from "react";
import { ArticleFilterStoreProps } from "../../../stores/ArticleFilterStore";
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE_FILTER } from "../../../constants/stores";

@inject(STORE_ARTICLE_FILTER)
@observer
export class TitleSearchBar extends React.Component<ArticleFilterStoreProps, any> {
  render() {
    const store = this.props[STORE_ARTICLE_FILTER];
    return <div>
      <span>{store.filter.titleText}</span>
    </div>;
  }
}
