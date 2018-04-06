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
import { ArticleShare } from "./ArticleShare";
import { ui } from "../../stores/UiUtil";
import { LocalizedDocumentTitle } from "../../internationalization/components/LocalizedDocumentTitle";

interface ArticlePageContentProps {
  article: FetchedArticle;
}

export class ArticlePageContent extends React.Component<ArticlePageContentProps, any> {

  componentDidMount() {
    ui.documentTitle = `${this.props.article.article.title} - VicBlog`;
  }

  render() {
    const {article} = this.props.article;
    return <LocalizedDocumentTitle formatId={"article.documentTitle"} replacements={{title: article.title}}>
      <div>
        <ArticleHeader article={article}/>
        <hr/>
        <div className={style("w3-col", "l2", "w3-hide-medium", "w3-hide-small")}>
          <Sticky>
            {(sticky) =><>
                <p/> {/*keeps the width when the ArticleOverview becomes absolute position*/}
                <ArticleOverview content={article.content}
                                 className={style({[localStyle["overview-sticky"]]: sticky})}
                />

            </>}

            </Sticky>

        </div>
        <div className={style("w3-col", "l8")}>
          <ArticleContent article={article}/>
          <hr/>
          <CommentPanel articleId={article.articleId}/>
        </div>
        <div className={style("w3-col", "l2")}>
          <hr className={style("w3-hide-large")}/>
          <Sticky>
            {isSticky => {
              return <div className={style({[localStyle.sticky]: isSticky}, localStyle.right)}>
                <LikePanel article={article}/>
                <ArticleShare link={ui.isBrowser ? window.location.href : ""}/>
              </div>;
            }}
          </Sticky>
        </div>
      </div>
    </LocalizedDocumentTitle>;
  }
}
