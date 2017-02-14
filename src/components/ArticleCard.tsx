import * as React from 'react';
import { ArticleBrief } from '../store/ArticleList';
import { Card, Tag, Rate } from 'antd';
import { APIs } from '../Utils';
import { Link } from 'react-router';
import moment from 'moment';

type ArticleCardProps = {
    brief: ArticleBrief,
} 

export class ArticleCard extends React.Component<ArticleCardProps, void>{
    render() {
        const url = APIs.article + this.props.brief.id;
        const tags = this.props.brief.tags.map(item => <Tag key={item} >{item}</Tag>);
        return <Card title={<Link to={`/articles/${this.props.brief.id}`}>{this.props.brief.title}</Link>}>
            <div>
                <div>{tags}</div>
                <br />
                <div>Rate: <Rate defaultValue={this.props.brief.rating} disabled/> </div>
                <p>Category {this.props.brief.category}</p>
                <p>Created in {moment.utc(this.props.brief.submitTime).local().format("MMMM Do, YYYY")}</p>
                <p>Edited in {moment.utc(this.props.brief.lastEditedTime).local().format("MMMM Do, YYYY")}</p>
                <p>By {this.props.brief.username}</p>
            </div>
        </Card>
    }
}
