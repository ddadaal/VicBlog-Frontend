import React from 'react';

import { ArticleListFetchError, ArticleListFetchErrorType } from "../../../api/ArticleListService";
import { LocaleMessage } from "../../../internationalization/components";
import style from '../../../components/style';

interface Props {
  error: ArticleListFetchError;
  retry() : void;
}

export class ErrorPanel extends React.Component<Props, {}> {
  render() {
    return <div>
      <p><LocaleMessage id={"homepage.recentArticles.error"}/></p>
      <p>
        <button className={style("w3-btn","w3-blue")}>
          <LocaleMessage id={"homepage.recentArticles.retry"}/>
        </button>
      </p>
    </div>
  }
}
