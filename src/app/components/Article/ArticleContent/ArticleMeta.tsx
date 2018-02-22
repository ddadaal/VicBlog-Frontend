import * as React from "react";
import { Article } from "../../../models";
import FaClockO from 'react-icons/lib/fa/clock-o';
import FaPencilSquare from "react-icons/lib/fa/pencil-square";
import FaUser from 'react-icons/lib/fa/user';
import FaTags from 'react-icons/lib/fa/tags';

import { LocaleDate } from "../../Common/Locale";
import { TooltipHost } from "office-ui-fabric-react";
import { ReactNode } from "react";
import { Localize } from "../../Common/Locale/Localize";
import { Tag } from "../../Common/Tag";

interface ArticleMetaProps {
  article: Article,

}

function Item(props: { icon: ReactNode, tooltipTextId: string, children: ReactNode }) {
  return <span style={{paddingRight: "20px"}}>
    <Localize content={props.tooltipTextId}>
      {(p) => <TooltipHost calloutProps={{gapSpace: 0}} {...p}>
        {props.icon}
        {props.children}
      </TooltipHost>}
    </Localize>

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