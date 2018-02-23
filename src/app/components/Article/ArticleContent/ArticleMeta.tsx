import * as React from "react";
import { Article } from "../../../models";
import FaClockO from 'react-icons/lib/fa/clock-o';
import FaPencilSquare from "react-icons/lib/fa/pencil-square";
import FaUser from 'react-icons/lib/fa/user';
import FaTags from 'react-icons/lib/fa/tags';

import { LocaleDate, LocaleMessage } from "../../Common/Locale";
import { ReactNode } from "react";
import style from '../../style';
import { Tag } from "../../Common/Tag";

interface ArticleMetaProps {
  article: Article,

}

function Item(props: { icon: ReactNode, tooltipTextId: string, children: ReactNode }) {
  return <span className={style("w3-tooltip")} style={{paddingRight: "20px"}}>
    {props.icon}
    <span className={style("w3-text","w3-tag","w3-animate-opacity")}><LocaleMessage id={props.tooltipTextId}/></span>
    {props.children}
  </span>
}

export class ArticleMeta extends React.Component<ArticleMetaProps, any> {
  render() {
    const {article} = this.props;
    return <div>
      <Item icon={<FaClockO size={20}/>} tooltipTextId={"article.createTime"}>
        <LocaleDate formatId={"article.dateFormat"} input={article.createTime}/>
      </Item>
      <Item icon={<FaPencilSquare size={20}/>} tooltipTextId={"article.lastEditedTime"}>
        <LocaleDate formatId={"article.dateFormat"} input={article.lastEditedTime}/>
      </Item>
      <Item icon={<FaUser size={20}/>} tooltipTextId={"article.author"}>
        <span>{article.username}</span>
      </Item>
      <Item icon={<FaTags size={20}/>} tooltipTextId={"article.tags"}>
        {article.tags.map(x => <Tag key={x} text={x}/>)}
      </Item>
    </div>;
  }
}