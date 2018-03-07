import * as React from "react";
import { ReactNode } from "react";
import { Article } from "../../../models";
import FaClockO from 'react-icons/lib/fa/clock-o';
import FaPencilSquare from "react-icons/lib/fa/pencil-square";
import FaUser from 'react-icons/lib/fa/user';
import FaTags from 'react-icons/lib/fa/tags';

import { LocaleDate, LocaleMessage } from "../../Common/Locale";
import { Tag } from "../../Common/Tag";
import { Tooltip } from "../../Common/Tooltip";

interface ArticleMetaProps {
  article: Article,

}

function Item(props: { icon: ReactNode, tooltipTextId: string, children: ReactNode }) {
  return <Tooltip beforeTooltip={props.icon} afterTooltip={props.children} style={{paddingRight: "20px"}}>
    <LocaleMessage id={props.tooltipTextId}/>
  </Tooltip>
}

export class ArticleMetaRow extends React.Component<ArticleMetaProps, any> {
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
        <span>{article.author}</span>
      </Item>
      <Item icon={<FaTags size={20}/>} tooltipTextId={"article.tags"}>
        {article.tags.map(x => <Tag key={x} text={x}/>)}
      </Item>
    </div>;
  }
}
