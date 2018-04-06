import React from 'react';
import { ArticleBrief } from "../../../models/Article";
import { Link } from 'react-router-dom';
import * as localStyle from './style.css';
import { Tag } from "../../../components/Common/Tag";
import { LocaleDate, LocaleMessage } from "../../../internationalization/components";
import { Inject } from "react.di";
import { RouterStore } from "../../../stores";

interface Props {
  brief: ArticleBrief;
}

function PHeader(props: {id: string}) {
  return <span style={{fontWeight: "bold", marginRight: "4px"}}>
    <LocaleMessage id={props.id}/>
  </span>;
}

export class ArticleItem extends React.Component<Props, {}> {

  @Inject routerStore: RouterStore;

  render() {
    const { brief}  = this.props;
    return <div>
      <h3>
          <a onClick={() => this.routerStore.jumpTo(`/articles/${brief.articleId}`)}
             style={{ cursor: "pointer" }}>
            {brief.title}
            </a>
      </h3>
      <p className={localStyle.row}>
        {brief.tags.map(x => <Tag colorStyle={"w3-light-grey"} key={x} text={x}/>)}
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
