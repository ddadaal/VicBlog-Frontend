import * as React from "react";
import { ReactNode } from "react";
import { slugify } from "../../Common/MarkdownDisplay/slugifier";
import { ui } from "../../../stores/UiUtil";
import * as localStyle from './style.css';

function getCoreProps(props) {
  return props['data-sourcepos'] ? {'data-sourcepos': props['data-sourcepos']} : {}
}

function selectHeading(level: number,
                       slug: string,
                       props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
                       children: ReactNode) {
  return React.createElement(`h${level}`, {...getCoreProps(props), id: slug, className: localStyle.title}, children);
}

function toTop() {
  if (ui.isBrowser) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
//
// function BackToTop(props: {}) {
//   return <Localize title={"article.backToTop"}>
//     {props => <span onClick={toTop} {...props}>↑</span>}
//     </Localize>;
// }


export function Heading(props: {level: number, children: ReactNode[]}) {
  const slug = slugify(props.children[0] as string);
  // props.children.push(<span key={1}>&emsp;</span>);
  // props.children.push(<BackToTop key={2}/>);
  return selectHeading(props.level, slug, props, props.children);
}
