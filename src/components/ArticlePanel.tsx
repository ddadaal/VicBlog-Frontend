import * as React from 'react';
import { ArticlePageState, Article } from '../store/ArticlePage';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card,Tag } from 'antd';

interface ArticlePanelProps {
    article: Article
}

export class ArticlePanel extends React.Component<ArticlePanelProps, void>{


    render(){

        return (
            <div>
            <h2>{this.props.article.title}</h2>
            <br/>
            {this.props.article.content}
            </div>
        )
    }
}