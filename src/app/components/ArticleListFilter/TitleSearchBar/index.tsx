import React, { KeyboardEvent } from "react";
import { observer } from "mobx-react";
import style from '../../style';
import { Localize } from "../../../internationalization/components";
import { action } from "mobx";
import FaSearch from 'react-icons/lib/fa/search';
import { ArticleListStore } from "../../../stores";
import { Inject } from "react.di";


@observer
export class TitleSearchBar extends React.Component<{}, any> {

  @Inject articleListStore: ArticleListStore;
  
  @action setTitleText = (e) => {
    this.articleListStore.filter.titleText = e.target.value;
  };

  @action search = () => {
    const store = this.articleListStore;
    store.expire();
    store.fetchPage();
  };

  @action onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which == 13) { // 13 is enter
      this.search();
    }
  };

  render() {
    const store = this.articleListStore;
    return <div>
      <Localize replacements={{
        placeholder: "articleList.filterAndSort.textsInTitle",
        update: "articleList.filterAndSort.update",
        clear: "articleList.filterAndSort.clear"
      }}>
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
