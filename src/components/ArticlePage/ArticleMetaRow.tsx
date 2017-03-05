import * as React from 'react';
import { Icon, Tooltip, Tag } from 'antd';
import { UserState, actionCreators } from '../../store/User';
import moment from 'moment';
import Rating from './Rating';

type ArticleMetaRowProps = {
    article: Article,
}

export default class ArticleMetaRow extends React.Component<ArticleMetaRowProps, void>{
    render() {

        const ItemColumn = (props: { iconName: string, content: string | JSX.Element | JSX.Element[], tooltip: string }) => <Tooltip title={props.tooltip}><span><Icon type={props.iconName} /> {props.content} &nbsp;</span></Tooltip>;
        const tags = this.props.article.tags.map(item => <Tag key={item}>{item}</Tag>);
        const categoryTag = <Tag key="category" color="blue">{this.props.article.category}</Tag>;

        return (<div>
            <ItemColumn iconName="user" content={this.props.article.username} tooltip="Author" />
            <ItemColumn iconName="tag-o" content={categoryTag} tooltip="category" />
            <ItemColumn iconName="tags" content={tags} tooltip="tags" />
            <ItemColumn iconName="clock-circle-o" content={moment.utc(this.props.article.submitTime).local().format("MMMM Do, YYYY")} tooltip="Create Time" />
            <ItemColumn iconName="clock-circle" content={moment.utc(this.props.article.lastEditedTime).local().format("MMMM Do, YYYY")} tooltip="Last Edited Time" />
            <Rating article={this.props.article}/>
        </div>)
    }
}