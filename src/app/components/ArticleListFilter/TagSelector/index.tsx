import React from "react";
import { STORE_ARTICLE_LIST } from "../../../constants/stores";
import { inject, observer } from "mobx-react";
import { ArticleListStoreProps } from "../../../stores/ArticleListStore";
import FaTags from 'react-icons/lib/fa/tags';
import { Tag } from "../../Common/Tag";
import style from "../../style";
import { action } from "mobx";
import * as localStyle from './style.css';

@inject(STORE_ARTICLE_LIST)
@observer
export class TagSelector extends React.Component<ArticleListStoreProps, {}> {

  onClickProducer = (text: string) => action(() => {
    const store = this.props[STORE_ARTICLE_LIST];
    const filter = store.filter;
    if (filter.tags.indexOf(text) >= 0) {
      filter.tags = filter.tags.filter(x => x !== text);
    } else {
      filter.tags = [...filter.tags, text];
    }
    store.expire();
    store.fetchPage();
  });

  render() {
    const store = this.props[STORE_ARTICLE_LIST];
    return <div className={style("w3-row","w3-section")}>
      <div className={style("w3-col")} style={{width:"32px"}}>
        <FaTags size={26}/>
      </div>
      <div className={style("w3-rest")}>
      {store.articleTags.map((x) =>
        <Tag text={x.text}
             key={x.text}
             className={localStyle.tag}
             colorStyle={x.color}
             onClick={this.onClickProducer(x.text)}/>
      )}
      </div>
    </div>;
  }
}
