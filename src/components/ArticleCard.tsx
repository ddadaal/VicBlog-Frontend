import * as React from 'react';
import { ArticleBrief } from '../store/ArticleList';
import { Card, Tag } from 'antd';
import { APIs } from '../Utils';
import moment from 'moment';

interface ArticleCardProps {
    brief: ArticleBrief
}

export class ArticleCard extends React.Component<ArticleCardProps, void>{
    render() {
        const url = APIs.article + this.props.brief.id;
        const tags = this.props.brief.categories.map(item => <Tag key={item}>{item}</Tag>);
        return <Card title={<a href={url}>{this.props.brief.title}</a>}>
            <div>
                <p>{tags}</p>
                <br />
                <p>Created in {moment.utc(this.props.brief.submitTime).local().format("MMMM Do, YYYY")}</p>
                <p>Edited in {moment.utc(this.props.brief.lastEditedTime).local().format("MMMM Do, YYYY")}</p>
                <p>By {this.props.brief.username}</p>
            </div>
        </Card>
    }
}