import { ArticleId } from "../../../models/Article";
import React from "react";
import { ArticleFetchError, ArticleFetchErrorType } from "../../../api/ArticleService";
import { LocaleMessage } from "../../../internationalization/components";
import style from '../../style';
import { Inject } from "react.di";
import { RouterStore } from "../../../stores";

interface ArticleFetchErrorContentProps {
  id: ArticleId;
  error: ArticleFetchError;
  refetch: () => void;
}

export class ArticleFetchErrorContent extends React.Component<ArticleFetchErrorContentProps, {}> {

  @Inject routerStore: RouterStore;

  goToList = () => {
    this.routerStore.jumpTo("/articles");
  };

  refresh = () => {
    this.props.refetch();
  };

  render() {
    let content;
    switch (this.props.error.type) {
      case ArticleFetchErrorType.NotFound:
        content = <div>
          <p><LocaleMessage id={"article.error.articleNotFound"} replacements={{ articleId: this.props.id+""}}/></p>
          <button className={style("w3-btn","w3-blue")} onClick={this.goToList}>
            <LocaleMessage id={"article.error.backToList"}/>
          </button>
        </div>;
        break;
      case ArticleFetchErrorType.ServerError:
        content = <div>
          <p><LocaleMessage id={"article.error.serverError"}/></p>;
          <button className={style("w3-btn","w3-blue")} onClick={this.refresh}>
            <LocaleMessage id={"article.error.backToList"}/>
          </button>
        </div>;
        break;
      case ArticleFetchErrorType.NetworkError:
        content = <div>
          <p><LocaleMessage id={"article.error.other"}/></p>
          <button className={style("w3-btn","w3-blue")} onClick={this.refresh}>
            <LocaleMessage id={"article.error.refresh"}/>
          </button>
        </div>
    }
    return <div style={{textAlign: "center", minHeight: "200px"}}>
      {content}
    </div>
  }
}
