import React, { KeyboardEvent, KeyboardEventHandler } from "react";
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import style from '../../style';
import { Localize } from "../../../internationalization/components";
import { action } from "mobx";
import { ArticleListStoreProps } from "../../../stores/ArticleListStore";
import FaSearch from 'react-icons/lib/fa/search';



@inject(STORE_ARTICLE_LIST)
@observer
export class TitleSearchBar extends React.Component<ArticleListStoreProps, any> {

  @action setTitleText = (e) => {
    this.props[STORE_ARTICLE_LIST].filter.titleText = e.target.value;
  };

  @action search = () => {
    const store = this.props[STORE_ARTICLE_LIST];
    store.expire();
    store.fetchPage();
  };

  @action onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which == 13) { // 13 is enter
      this.search();
    }
  };

  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    return <div>
      <Localize placeholder={"articleList.filterAndSort.textsInTitle"}
                update={"articleList.filterAndSort.update"}
                clear={"articleList.filterAndSort.clear"}

      >
        {props =>
          <div className={style("w3-row","w3-section")}>
            <div className={style("w3-col")} style={{width:"32px"}}>
              <FaSearch size={26}/>
            </div>
            <div className={style("w3-rest")}>
              <input className={style("w3-input", "w3-border")}
                     type="text"
                     value={store.filter.titleText}
                     onChange={this.setTitleText}
                     placeholder={props.placeholder}
                     onKeyUp={this.onKeyUp}
              />
            </div>
          </div>
        }
      </Localize>
    </div>;
  }
}
