import React from "react";
import { observer } from "mobx-react";
import { Dropdown } from "../../Common/Dropdown";
import style from '../../style/index';
import { LocaleMessage } from "../../../internationalization/components";
import { runInAction } from "mobx";
import * as localStyle from './style.css';
import FaSortAlphaAsc from 'react-icons/lib/fa/sort-alpha-asc';
import { ArticleListStore } from "../../../stores";
import { Inject } from "react.di";
import { ArticleListOrder } from "../../../api/ArticleListService";

function OrderItem(props: {id: string, onClick : () => void}) {
  return <a className={style("w3-bar-item", "w3-button")} onClick={props.onClick}>
    <LocaleMessage key={props.id} id={`articleList.order.${props.id}`}/>
  </a>;
}


@observer
export class OrderIndicator extends React.Component<{}, any> {

  @Inject articleListStore: ArticleListStore;

  onClickProducer = (order: ArticleListOrder) => () => {
    runInAction(() => {
      const store = this.articleListStore;
      if (store.order !== order) {
        store.expire();
        store.order = order;
      }
      store.currentPageNumber = 1;
      store.fetchPage();
    })
  };

  render() {


    const store = this.articleListStore;
    const entry = <button className={style("w3-button")}>
      <LocaleMessage id={`articleList.order.${store.order}`}/>
    </button>;
    return <div >
      <div style={{width:"32px"}} className={localStyle.icon}>
        <FaSortAlphaAsc size={26}/>
      </div>
      <div className={localStyle.icon}>
        <Dropdown entry={entry} className={"w3-border"}>
          {Object.keys(ArticleListOrder)
            .map(x =>
              <OrderItem key={x} id={x} onClick={this.onClickProducer(ArticleListOrder[x])}/>
            )
          }
        </Dropdown>
      </div>
    </div>;
  }
}
