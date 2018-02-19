import * as React from "react";
import { ArticleBrief } from "../../../models/Article";
import style from '../../style';
import { observer } from "mobx-react";

interface ArticleListItemProps {
  brief: ArticleBrief
}

export class ArticleListItem extends React.Component<ArticleListItemProps, any> {
  render() {

    const { brief } = this.props;

    return <div className={style("w3-container")}>
      <h4>{brief.title}</h4>
    </div>
  }
}