import * as React from "react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { ArticleListStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import style from '../../style';
import { action, observable, runInAction } from "mobx";
import { LocaleMessage } from "../../Common/Locale";
import { Localize } from "../../Common/Locale/Localize";
import { ArticleFilter } from "../../../models/ArticleFilter";
import { OrderIndicator } from "./OrderIndicator";


interface ArticleListFilterPanelProps {
  [STORE_ARTICLE_LIST]?: ArticleListStore
}

@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListFilterPanel extends React.Component<ArticleListFilterPanelProps, any> {

  @observable titleText: string = "";

  @action onTitleInputChange = (e) => {
    this.titleText = e.target.value;
  };

  @action onFilter = () => {
    this.props[STORE_ARTICLE_LIST].setFilter({
      titleText: this.titleText
    });
    this.props[STORE_ARTICLE_LIST].completeRefetch();
  };

  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    return <div className={style("w3-container")}>
      <h2>
        <LocaleMessage id={"articleList.filterAndSort.title"}/>
      </h2>
      <p>

      <Localize placeholder={"articleList.filterAndSort.textsInTitle"}>
        {props => <input value={this.titleText} type="text"
               onChange={this.onTitleInputChange}  className={style("w3-input")} {...props}/>}
      </Localize>
      </p>
      <p>
        <OrderIndicator/>
      </p>
      <button className={style("w3-button")} onClick={this.onFilter}>
        <LocaleMessage id={"articleList.filterAndSort.update"}/>
      </button>
    </div>
  }
}
