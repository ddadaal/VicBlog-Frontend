import * as React from 'react';
import { Icon, Tooltip, Tag, Popconfirm } from 'antd';
import { UserState, actionCreators as userActions, UserStatus } from '../../store/User';
import { actionCreators as articleActions } from '../../store/ArticlePage';
import { actionCreators as pvActions } from '../../store/PV';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { PVFetchSecondsSpan } from '../../Utils';
import Rating from './Rating';

type ArticleMetaRowProps = {
    article: Article,
    userState: UserState,
    pvState: any
} & typeof userActions & typeof pvActions & typeof articleActions;


class ArticleMetaRow extends React.Component<ArticleMetaRowProps, void>{

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchPV(this.props.article.id);

    }

    render() {

        const ItemColumn = (props: { iconName: string, content: string | JSX.Element | JSX.Element[], tooltip: string }) => <Tooltip title={props.tooltip}><span><Icon type={props.iconName} /> {props.content} &nbsp;</span></Tooltip>;
        const tags = this.props.article.tags.map(item => <Tag key={item}>{item}</Tag>);
        const categoryTag = <Tag key="category" color="blue">{this.props.article.category}</Tag>;

        return (<div>
            <ItemColumn iconName="user" content={this.props.article.username} tooltip="Author" />
            <ItemColumn iconName="tag-o" content={categoryTag} tooltip="Category" />
            <ItemColumn iconName="tags" content={tags} tooltip="Tags" />
            <ItemColumn iconName="clock-circle-o" content={moment.utc(this.props.article.submitTime).local().format("MMM Do, YYYY, HH:mm:ss")} tooltip="Create Time" />
            <ItemColumn iconName="clock-circle" content={moment.utc(this.props.article.lastEditedTime).local().format("MMM Do, YYYY, HH:mm:ss")} tooltip="Last Edited Time" />
            <ItemColumn iconName="like-o" content={!this.props.pvState[this.props.article.id] ? "Fetching PV..." : this.props.pvState[this.props.article.id].fetching ? "Fetching PV..." : this.props.pvState[this.props.article.id].error ? "Error fetching pv." : `${this.props.pvState[this.props.article.id].pv}`} tooltip="Viewed times" />
            <Rating article={this.props.article} />&nbsp;

            {this.props.userState.status == UserStatus.LoggedIn && this.props.userState.user.username == this.props.article.username
                ? [
                    <ItemColumn key="edit" iconName="edit" content={<Link to={`/articles/${this.props.article.id}/edit`}>Edit</Link>} tooltip="Edit this article" />,
                    <Popconfirm key="deletePopconfirm" title="Are you sure delete this article?" onConfirm={() => this.props.deleteArticle(this.props.userState.user.token, this.props.article.id)} okText="Yes" cancelText="No">
                        <a key="delete" style={{ color: "#FF0000" }}><Icon type="delete" /> Delete</a>
                    </Popconfirm>,
                ]
                : []}
        </div>)
    }
}

export default connect(
    s => ({ userState: s.user, pvState: s.pv }),
    { ...userActions, ...articleActions, ...pvActions },
    (state, dispatch, ownProps: { article: Article }) => ({ ...state, ...dispatch, article: ownProps.article })
)(ArticleMetaRow);