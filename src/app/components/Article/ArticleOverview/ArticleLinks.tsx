import { Article } from "../../../models";
import * as React from "react";
import { getTitleNodes } from "./LinksAnalyzer";
import { TitleNode } from "../../Common/MarkdownDisplay/slugifier";
import FaBookmark from "react-icons/lib/fa/bookmark";
import { LocaleMessage } from "../../Common/Locale";

interface ArticleLinksProps {
  content: string
}

interface LinkProps {
  node: TitleNode
}

function Link(props: LinkProps) {
  const x = props.node;
  return <span style={{whiteSpace: "pre"}}>
    {" ".repeat(props.node.level*2-2)}
    <a style={{textDecoration: "none"}} href={`#${x.slug}`}>
      {x.text}
      </a>
    <br/>
  </span>;
}


export class ArticleLinks extends React.Component<ArticleLinksProps, {}> {

  render() {
    const titles = getTitleNodes(this.props.content);
    return <div>
      <p>
        <FaBookmark size={20}/>
        &nbsp;
        <b>
          <LocaleMessage id={"article.toc"}/>
        </b>
      </p>
      {titles.map(x => <Link key={x.slug} node={x}/>)}
    </div>;
  }
}