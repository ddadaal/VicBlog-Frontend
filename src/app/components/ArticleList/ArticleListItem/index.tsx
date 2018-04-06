import React from "react";
import { ArticleBrief } from "../../../models/Article";
import { observer } from "mobx-react";
import { ArticleListStore, RouterStore } from "../../../stores";
import { Tag } from "../../Common/Tag";
import * as localStyle from './style.css';
import * as rowStyle from '../../style/InterColumnMargin/style.css';
import { LocaleDate, LocaleMessage } from "../../../internationalization/components";
import { Inject } from "react.di";
import { Link } from 'react-router-dom';

interface ArticleListItemProps {
  brief: ArticleBrief;
}

function PHeader(props: {id: string}) {
  return <span className={localStyle["info-header"]}>
    <LocaleMessage id={props.id}/>
  </span>;
}


@observer
export class ArticleListItem extends React.Component<ArticleListItemProps, any> {

  
  @Inject articleListStore: ArticleListStore;

  @Inject routerStore: RouterStore;

  render() {

    const { brief } = this.props;
    const articleListStore = this.articleListStore;
    const articleTags = articleListStore.articleTags;

    return <div>
      <h2>
        <a onClick={() => this.routerStore.jumpTo(`/articles/${brief.articleId}`)}
           style={{ cursor: "pointer" }}>
          {brief.title}
        </a>
      </h2>
      <p className={rowStyle.parent}>
        {brief.tags.map(x => {
          const tag = articleTags.find(tag => tag.text === x);
          return <Tag colorStyle={tag ? tag.color : "w3-light-grey"} key={x} text={x}/>
        })}
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
