import * as React from 'react';
import { ArticleBrief } from '../store/ArticleList';
import { Card, Tag, Rate, Icon } from 'antd';
import { APIs } from '../Utils';
import { Link } from 'react-router';
import moment from 'moment';

type ArticleCardProps = {
    brief: ArticleBrief,
}

export default class ArticleCard extends React.Component<ArticleCardProps, void>{


    render() {
        const url = APIs.article + this.props.brief.id;
        const tags = this.props.brief.tags.map(item => <Tag key={item} >{item}</Tag>);
        return <Card title={<div><Link to={`/articles/${this.props.brief.id}`}>{this.props.brief.title}</Link> <Tag key="category" color="blue">{this.props.brief.category}</Tag></div> }>
            <div>
                <div><Icon type="tags" /> {tags}</div>
                <div>Rate: <Rate defaultValue={this.props.brief.rate} disabled allowHalf /> {this.props.brief.rate.toFixed(1)} </div>
                <br />
                <p><Icon type="clock-circle-o" /> Created in {moment.utc(this.props.brief.submitTime).local().format("MMMM Do, YYYY")}</p>
                <p><Icon type="clock-circle" /> Edited in {moment.utc(this.props.brief.lastEditedTime).local().format("MMMM Do, YYYY")}</p>
                <p><Icon type="user" /> By {this.props.brief.username}</p>
            </div>
        </Card>
    }
}
