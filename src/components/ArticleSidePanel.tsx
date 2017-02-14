import * as React from 'react';
import { Article, actionCreators as articlePageActions, ArticlePageState, RatingStatus } from '../store/ArticlePage';
import { UserState, Status, actionCreators as userActions } from '../store/User';
import { Card, Tag, Collapse, Table, Icon, Rate, notification, Popconfirm } from 'antd';
import { errorMessage} from '../Utils';
import { connect } from 'react-redux';
import Rating from './Rating';
import moment from 'moment';
const Panel = Collapse.Panel;

type ArticleSidePanelProps = {
    article: Article,
}


export class ArticleSidePanel extends React.Component<ArticleSidePanelProps, void>{
    constructor() {
        super();
    }

    stringify(dataNum: number) {
        return moment.utc(dataNum).local().format("MMMM Do, YYYY");
    }
    render() {

        const tags = this.props.article.tags.map(item => <Tag key={item}>{item}</Tag>);
        return <Card title={<span><Icon type="info-circle-o" /> Meta info</span>}>

            <div>Click the star to rate this article! <Rating article={this.props.article}/>
            </div>

            <p>Author: {this.props.article.username}</p>
            <p>Category: {this.props.article.category}</p>
            <div>Tags: {tags}</div>
            <p>Created in {this.stringify(this.props.article.submitTime)}.</p>
            <p>Last edited in {this.stringify(this.props.article.lastEditedTime)}.</p>
        </Card>;

        {/*return <Card title="Meta">
            <p>Author: {this.props.article.username}</p>
            <p>Category: {this.props.article.category}</p>
            <div>Tags: {tags}</div>
            <p>Created in {this.stringify(this.props.article.submitTime)}.</p>
            <p>Last edited in {this.stringify(this.props.article.lastEditedTime)}.</p>
        </Card>*/}
    }
}