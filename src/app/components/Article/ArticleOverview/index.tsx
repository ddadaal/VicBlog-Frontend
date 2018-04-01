import React from "react";
import * as localStyle from './style.css';
import { ArticleLinks } from "./ArticleLinks";
import { Sticky } from "../../Common/Sticky";
import style from '../../style';

interface ArticleOverviewProps {
  content: string,
}


export class ArticleOverview extends React.Component<ArticleOverviewProps, any> {

  render() {
    return <Sticky>
      {(sticky) =>
        <div className={style({[localStyle["overview-sticky"]]: sticky})}>
          <ArticleLinks content={this.props.content}/>
        </div>}
    </Sticky>
  }
}
