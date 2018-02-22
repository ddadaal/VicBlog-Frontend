import * as React from "react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { ArticleListStore } from "../../../stores/ArticleListStore";
import { inject, observer } from "mobx-react";
import style from '../../style';
import { action, observable } from "mobx";
import { LocaleMessage } from "../../Common/Locale";
import { LocaleInput } from "../../Common/Locale/LocaleInput";


interface ArticleListFilterProps {
  [STORE_ARTICLE_LIST]?: ArticleListStore
}


@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListFilter extends React.Component<ArticleListFilterProps, any> {

  @observable titleText: string = "";

  @action onTitleInputChange = (e) => {
    this.titleText = e.target.value;
  };

  render() {
    return <div className={style("w3-container")}>
      <h2><LocaleMessage id={"articleList.filter.title"}/></h2>
      <LocaleInput placeholderTextId={"articleList.filter.textsInTitle"}
                   value={this.titleText}
                   onChange={this.onTitleInputChange} type={"text"} className={style("w3-input")}/>

    </div>
  }
}