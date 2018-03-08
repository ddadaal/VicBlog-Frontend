import React from "react";
import { LocaleMessage } from "../../Common/Locale";
import { ArticleListFetchError, ArticleListFetchErrorType } from "../../../stores/ArticleListStore";
import { AlertPanel } from "../../Modals/AlertPanel";
import style from '../../style';

interface ArticleListFetchErrorContentProps {
  error: ArticleListFetchError;
  retry: ()=>void;
}

export class ArticleListFetchErrorContent extends React.Component<ArticleListFetchErrorContentProps, any> {

  constructAlertPanel() {
    let message = null;
    switch (this.props.error.type) {
      case ArticleListFetchErrorType.NetworkError:
        message = <LocaleMessage id={"articleList.fetchError.networkError"}/>;
        break;
      case ArticleListFetchErrorType.ServerError:
        message = "Server Error";
        break;
      case ArticleListFetchErrorType.Unknown:
        message = <LocaleMessage id={"articleList.fetchError.unknownError"}/>;
    }

    return <AlertPanel>
      <h3>{message}</h3>
      <p><button className={style("w3-button")} onClick={this.props.retry}>
        <LocaleMessage id={"articleList.fetchError.retry"}/>
      </button></p>
    </AlertPanel>;
  }

  render() {
    return <div>
      {this.constructAlertPanel()}
    </div>;
  }
}
