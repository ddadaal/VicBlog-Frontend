import { ArticleId } from "../../../models/Article";
import * as React from "react";
import style from "../../style";
import { LocaleMessage } from "../../Common/Locale";
import { Spin } from "../../Common/Spin";

interface ArticleFetchingContentProps {
  id: ArticleId,
}

export class ArticleFetchingContent extends React.Component<ArticleFetchingContentProps, {}> {
  render() {
    return <div className={style("w3-container")}>
      <h3>
      <Spin/>
      <LocaleMessage id={"article.loading"} replacements={{
        id: this.props.id
      }}/>
      </h3>
    </div>;
  }
}
