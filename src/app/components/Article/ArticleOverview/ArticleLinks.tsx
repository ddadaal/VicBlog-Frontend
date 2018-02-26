import * as React from "react";
import { getTitleNodes } from "./LinksAnalyzer";
import { TitleNode } from "../../Common/MarkdownDisplay/slugifier";
import FaBookmark from "react-icons/lib/fa/bookmark";
import { LocaleMessage } from "../../Common/Locale";
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
  return <div style={{wordWrap: "break-word", marginLeft: `${margin}px`}}>
    <a className={localStyle.link} href={`#${x.slug}`}>
      ·&nbsp;{x.text}
      </a>
    <br/>
  </div>;
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