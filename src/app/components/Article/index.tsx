import * as React from "react";
import { ArticleFetchError, ArticleStore, FetchedArticle } from "../../stores/ArticleStore";
import style from '../../components/style';
import { ArticleContent } from "./ArticleContent";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleOverview } from "./ArticleOverview";
import { LikePanel } from "./LikePanel";

interface ArticleContentPageProps {
  article: FetchedArticle;
}

export class ArticleContentPage extends React.Component<ArticleContentPageProps, any> {
  render() {

    return <div>
      <ArticleHeader article={this.props.article.article}/>
      {/*<ScrollUpButton/>*/}
      <hr/>
      <div className={style("w3-col","l2","w3-hide-medium","w3-hide-small")}>
        <p/> {/*keeps the width when the ArticleOverview becomes absolute position*/}
        <ArticleOverview content={this.props.article.article.content}/>
      </div>
      <div className={style("w3-col","l8")}>
        <ArticleContent article={this.props.article.article}/>
      </div>
      <div className={style("w3-col","l2")}>
        <LikePanel likes={this.props.article.article.likeCount}/>
      </div>
    </div>;
  }
}