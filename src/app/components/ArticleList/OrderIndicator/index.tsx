import React from "react";
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { Dropdown } from "../../Common/Dropdown";
import style from '../../style/index';
import { LocaleMessage } from "../../../internationalization/components";
import { runInAction } from "mobx";
import { ArticleListOrder, ArticleListStoreProps } from "../../../stores/ArticleListStore";
import { Article } from "../../../models";

function OrderItem(props: {id: string, onClick : () => void}) {
  return <a className={style("w3-bar-item", "w3-button")} onClick={props.onClick}>
    <LocaleMessage key={props.id} id={`articleList.order.${props.id}`}/>
  </a>;
}


@inject(STORE_ARTICLE_LIST)
@observer
export class OrderIndicator extends React.Component<ArticleListStoreProps, any> {

  onClickProducer = (order: ArticleListOrder) => () => {
    runInAction(() => {
      const store = this.props[STORE_ARTICLE_LIST];
      if (store.order !== order) {
        store.expire();
        store.order = order;
      }
      store.fetchPage(1);
    })
  };

  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    const entry = <button className={style("w3-button")}>
      <LocaleMessage id={`articleList.order.${store.order}`}/>
    </button>;
    return <div>
      <Dropdown entry={entry}>
        {Object.keys(ArticleListOrder)
          .map(x =>
            <OrderItem key={x} id={x} onClick={this.onClickProducer(ArticleListOrder[x])}/>
          )
        }
      </Dropdown>

    </div>;
  }
}
