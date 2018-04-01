import React from "react";
import { getTitleNodes } from "./LinksAnalyzer";
import { TitleNode } from "../../Common/MarkdownDisplay/slugifier";
import FaBookmark from "react-icons/lib/fa/bookmark";
import { LocaleMessage } from "../../../internationalization/components";
import * as localStyle from './style.css';

interface ArticleLinksProps {
  content: string
}

interface LinkProps {
  node: TitleNode
}

function Link(props: LinkProps) {
  const x = props.node;
  const margin = 16*(x.level-1);
  return <div className={localStyle.title} style={{marginLeft: `${margin}px`}}>
    <a className={localStyle.link} href={`#${x.slug}`}>
      ·&nbsp;{x.text}
      </a>
    <br/>
  </div>;
}

function LinkList(props: {nodes: TitleNode[]}) {
  return <div>
    {props.nodes.map(x => <Link key={x.slug} node={x}/>)}
  </div>;
}


export class ArticleLinks extends React.Component<ArticleLinksProps, {}> {

  render() {
    const titles = getTitleNodes(this.props.content);
    return <div>
      <p>
        <FaBookmark size={20}/>
        <span style={{marginLeft: "5px"}}>
          <b>
            <LocaleMessage id={"article.toc"}/>
          </b>
        </span>
      </p>
      <LinkList nodes={titles}/>
    </div>;
  }
}
