import { ArticleId } from "../../../models/Article";
import React from "react";
import style from "../../style";
import { Spin } from "../../Common/Spin";
import { LocaleMessage } from "../../../internationalization/components";

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
