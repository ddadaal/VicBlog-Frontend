import * as React from 'react';
import { MarkdownDisplay } from '../common';
import { Card, Tag } from 'antd';
import { ArticleMetaRow } from './';

export interface ArticlePanelProps {
  article: Article
}

export default class ArticlePanel extends React.Component<ArticlePanelProps, any>{
  render() {

    return (
      <div>

        <div style={{textAlign: "center"}}>
          <h1>{this.props.article.title}</h1>
          <ArticleMetaRow article={this.props.article} />
        </div>
        <hr />
        <MarkdownDisplay content={this.props.article.content} />
      </div>
    )
  }
}