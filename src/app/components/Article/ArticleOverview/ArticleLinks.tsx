import { Article } from "../../../models";
import * as React from "react";
import { getTitleNodes } from "./LinksAnalyzer";
import { TitleNode } from "../../Common/MarkdownDisplay/slugifier";

interface ArticleLinksProps {
  content: string
}

interface LinkProps {
  node: TitleNode
}

function Link(props: LinkProps) {
  const x = props.node;
  return <span><a href={`#${x.slug}`}>{x.text}</a><br/></span>;
}


export class ArticleLinks extends React.Component<ArticleLinksProps, {}> {

  render() {
    const titles = getTitleNodes(this.props.content);
    return <div>
      {titles.map(x => <Link key={x.slug} node={x}/>)}
    </div>;
  }
}