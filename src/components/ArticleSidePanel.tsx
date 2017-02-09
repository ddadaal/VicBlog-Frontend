import * as React from 'react';
import { Article } from '../store/ArticlePage';
import { Card, Tag, Collapse, Table, Icon } from 'antd';
import moment from 'moment';
const Panel = Collapse.Panel;

interface ArticleSidePanelProps {
    article: Article
}

export class ArticleSidePanel extends React.Component<ArticleSidePanelProps, void>{

    stringify(dataNum: number) {
        return moment.utc(dataNum).local().format("MMMM Do, YYYY");
    }
    render() {
        const tags = this.props.article.tags.map(item => <Tag key={item}>{item}</Tag>);
        return <Card title={<span><Icon type="info-circle-o" /> Meta info</span>}>
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