import * as React from "react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { ArticleListStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import style from '../../style';
import { action, computed, observable, runInAction } from "mobx";
import { LocaleMessage } from "../../Common/Locale";
import { Localize } from "../../Common/Locale/Localize";
import { ArticleFilter } from "../../../models/ArticleFilter";
import { OrderIndicator } from "./OrderIndicator";
import FaFilter from "react-icons/lib/fa/filter";

interface ArticleListFilterPanelProps {
  [STORE_ARTICLE_LIST]?: ArticleListStore
}

@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListFilterPanel extends React.Component<ArticleListFilterPanelProps, any> {


  get filter() {
    return this.props[STORE_ARTICLE_LIST].nextFilter;
  }

  @action onTitleInputChange = (e) => {
    this.filter.titleText = e.target.value;
  };

  @action onFilter = () => {
    this.props[STORE_ARTICLE_LIST].completeRefetch();
  };

  @action clearFilter = () => {
    this.filter.titleText = "";

  };


  render() {
    return <div>

      <h3>
        <FaFilter size={28}/>
        <LocaleMessage id={"articleList.filterAndSort.title"}/>
      </h3>
      <p>

        <Localize placeholder={"articleList.filterAndSort.textsInTitle"}>
          {props => <input value={this.filter.titleText} type="text"
                           onChange={this.onTitleInputChange} className={style("w3-input")} {...props}/>}
        </Localize>
      </p>
      <OrderIndicator/>
      <p>
        <button className={style("w3-button", "w3-blue")} onClick={this.onFilter}>
          <LocaleMessage id={"articleList.filterAndSort.update"}/>
        </button>
        <button className={style("w3-button", "w3-red")} onClick={this.clearFilter}>
          <LocaleMessage id={"articleList.filterAndSort.clear"}/>
        </button>
      </p>
    </div>
  }
}
