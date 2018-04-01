import React from "react";
import { FetchedArticle } from "../../stores/ArticleStore";
import style from '../../components/style';
import * as localStyle from './style.css';
import { ArticleContent } from "./ArticleContent";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleOverview } from "./ArticleOverview";
import { LikePanel } from "./LikePanel";
import { CommentPanel } from "./CommentPanel";
import { Sticky } from "../Common/Sticky";

interface ArticlePageContentProps {
  article: FetchedArticle;
}

export class ArticlePageContent extends React.Component<ArticlePageContentProps, any> {
  render() {
    const { article } = this.props.article;
    return <div>
      <ArticleHeader article={article}/>
      <hr/>
      <div className={style("w3-col", "l2", "w3-hide-medium", "w3-hide-small")}>
        <p/> {/*keeps the width when the ArticleOverview becomes absolute position*/}
        <ArticleOverview content={article.content}/>
      </div>
      <div className={style("w3-col", "l8")}>
        <ArticleContent article={article}/>
      </div>
      <div className={style("w3-col", "l2")}>
        <hr className={style("w3-hide-large")}/>
        <Sticky>
          {isSticky => {
            return <div className={style({[localStyle.sticky]: isSticky})}>
              <LikePanel article={article}/>
              <CommentPanel article={article}/>
            </div>;
          }}
        </Sticky>
      </div>
    </div>;
  }
}
