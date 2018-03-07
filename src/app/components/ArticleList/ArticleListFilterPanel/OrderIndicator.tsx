import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { Dropdown } from "../../Common/Dropdown";
import style from '../../style';
import { LocaleMessage } from "../../Common/Locale";
import { ArticleListOrder, ArticleListStoreProps } from "../../../stores/ArticleListStore";

function OrderItem(props: {id: string, onClick : () => void}) {
  return <a className={style("w3-bar-item", "w3-button")} onClick={props.onClick}>
    <LocaleMessage key={props.id} id={`articleList.order.${props.id}`}/>
  </a>;
}


@inject(STORE_ARTICLE_LIST)
@observer
export class OrderIndicator extends React.Component<ArticleListStoreProps, any> {
  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    const entry = <button className={style("w3-button")}>
      <LocaleMessage id={`articleList.order.${store.nextListOrder}`}/>
    </button>;
    return <div>
      <Dropdown entry={entry}>
        {Object.keys(ArticleListOrder)
          .map(x =>
            <OrderItem key={x} id={x} onClick={() => store.setOrder(ArticleListOrder[x])}/>
          )
        }
      </Dropdown>

    </div>;
  }
}
