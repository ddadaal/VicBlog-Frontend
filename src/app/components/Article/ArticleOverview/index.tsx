import * as React from "react";
import * as classNames from 'classnames';
import * as localStyle from './style.css';
import { ArticleLinks } from "./ArticleLinks";
import { Sticky } from "../../Common/Sticky/index";

interface ArticleOverviewProps {
  content: string,
}


export class ArticleOverview extends React.Component<ArticleOverviewProps, any> {

  render() {
    return <Sticky>
      {(sticky) =>
        <div className={classNames({[localStyle["overview-sticky"]]: sticky})}>
          <ArticleLinks content={this.props.content}/>
        </div>}
    </Sticky>
  }
}