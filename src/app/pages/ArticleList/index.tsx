import * as React from "react";
import style from '../../components/style';
import { ArticleListPageContent } from "../../components/ArticleList";
import { ArticleListFilterPanel } from "../../components/ArticleList/ArticleListFilterPanel";
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE, STORE_ARTICLE_LIST } from "../../constants/stores";
import { ArticleListStore } from "../../stores";
import { action, observable, runInAction } from "mobx";
import { ArticleFetchError, FetchedArticle } from "../../stores/ArticleStore";
import { ArticleListFetchError } from "../../stores/ArticleListStore";
import { ArticleBrief, ArticleList } from "../../models/Article";
import { LocaleMessage } from "../../components/Common/Locale";
import { ArticleListFetchingContent } from "../../components/ArticleList/ArticleListFetchingContent";
import { ArticleListFetchErrorContent } from "../../components/ArticleList/ArticleListFetchErrorContent";

interface ArticleListPageProps {
  [STORE_ARTICLE_LIST]?: ArticleListStore;
}

@inject(STORE_ARTICLE_LIST)
@observer
export class ArticleListPage extends React.Component<ArticleListPageProps, any> {

  render() {

    return <div className={style("w3-container","w3-row")}>
      <ArticleListPageContent/>
    </div>;

  }
}

