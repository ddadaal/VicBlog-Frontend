import * as React from "react";
import { STORE_ARTICLE } from "../../constants/stores";
import { ArticleStore, FetchedArticle } from "../../stores/ArticleStore";
import { inject, observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";
import style from '../../components/style';
import { LocaleMessage } from "../../components/Common/Locale";
import { ArticleContent } from "../../components/Article/ArticleContent";

interface ArticlePageProps {
  [STORE_ARTICLE]?: ArticleStore,
  articleId: number
}

@inject(STORE_ARTICLE)
@observer
export class ArticlePage extends React.Component<ArticlePageProps, any> {

  @observable.ref article: FetchedArticle = null;

  @action async componentDidMount() {
    const store = this.props[STORE_ARTICLE];
    const article = await store.fetchArticle(this.props.articleId);
    runInAction(()=> {
      this.article = article;
    })
  }

  render() {
    if (!this.article) {
      return <div className={style("w3-container")}>
        <LocaleMessage id={"article.loading"} replacements={{
          id: this.props.articleId
        }}/>
      </div>;
    }
    return <div className={style("w3-container","w3-row")}>
      <div className={style("w3-col","l3","w3-hide-medium","w3-hide-small")}>
        Overview
      </div>
      <div className={style("w3-rest","w3-container")}>
        <ArticleContent article={this.article.article} contentHtml={""}/>
      </div>
    </div>;
  }
}

