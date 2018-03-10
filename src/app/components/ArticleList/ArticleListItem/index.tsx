import * as React from "react";
import { ArticleBrief } from "../../../models/Article";
import { inject, observer } from "mobx-react";
import { STORE_ROUTER } from "../../../constants/stores";
import { RouterStore } from "../../../stores";
import { Tag } from "../../Common/Tag";
import * as localStyle from './style.css';
import { LocaleDate, LocaleMessage } from "../../../internationalization/components";

interface ArticleListItemProps {
  brief: ArticleBrief,
  [STORE_ROUTER]?: RouterStore
}

function PHeader(props: {id: string}) {
  return <span className={localStyle["info-header"]}>
    <LocaleMessage id={props.id}/>
  </span>;
}



@inject(STORE_ROUTER)
@observer
export class ArticleListItem extends React.Component<ArticleListItemProps, any> {

  jumpTo = () => {
    const router = this.props[STORE_ROUTER];
    router.jumpTo(`/articles/${this.props.brief.articleId}`);
  };

  render() {

    const { brief } = this.props;

    return <div>
      <h2><a style={{ cursor: "pointer" }} onClick={this.jumpTo}>{brief.title}</a></h2>
      <p>
        {brief.tags.map(x =>
          <Tag key={x} text={x}/>
        )}
      </p>
      <p>
        <PHeader id={"articleList.createTime"}/>
        <LocaleDate formatId={"articleList.dateFormat"} input={brief.createTime}/>
      </p>
      <p>
        <PHeader id={"articleList.lastEditedTime"}/>
        <LocaleDate formatId={"articleList.dateFormat"} input={brief.lastEditedTime}/>
      </p>
      <p>
        <PHeader id={"articleList.likeCount"}/>
        {brief.likeCount}
      </p>
      <p>
        <PHeader id={"articleList.commentCount"}/>
        {brief.commentCount}
      </p>
      <p>
        <PHeader id={"articleList.author"}/>
        {brief.author}
      </p>
      <hr/>
    </div>
  }
}
