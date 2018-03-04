import * as React from "react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { ArticleListStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import style from '../../style';
import { action, observable } from "mobx";
import { LocaleMessage } from "../../Common/Locale";
import { Localize } from "../../Common/Locale/Localize";


interface ArticleListFilterProps {
  tags: string[]
}

export class ArticleListFilter extends React.Component<ArticleListFilterProps, any> {

  @observable titleText: string = "";

  @action onTitleInputChange = (e) => {
    this.titleText = e.target.value;
  };

  render() {
    return <div className={style("w3-container")}>
      <h2><LocaleMessage id={"articleList.filter.title"}/></h2>
      <Localize placeholder={"articleList.filter.textsInTitle"}>
        {props => <input value={this.titleText} type="text"
               onChange={this.onTitleInputChange}  className={style("w3-input")} {...props}/>}
      </Localize>
    </div>
  }
}
