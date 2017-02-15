import * as React from 'react';
import { Article, actionCreators as articlePageActions, ArticlePageState } from '../store/ArticlePage';
import { UserState, Status, actionCreators as userActions } from '../store/User';
import { Card, Tag, Collapse, Table, Icon, Rate, notification, Popconfirm, Button } from 'antd';
import { errorMessage} from '../Utils';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Rating from './Rating';
import moment from 'moment';
const Panel = Collapse.Panel;

type ArticleSidePanelProps = {
    article: Article,
    userState: UserState
} & typeof articlePageActions;


class ArticleSidePanel extends React.Component<ArticleSidePanelProps, void>{
    constructor() {
        super();
    }

    stringify(dataNum: number) {
        return moment.utc(dataNum).local().format("MMMM Do, YYYY");
    }
    render() {

        const tags = this.props.article.tags.map(item => <Tag key={item}>{item}</Tag>);
        return <Card title={<span><Icon type="info-circle-o" /> Meta info</span>}>

            <div>Click the star to rate this article! <br/>
                <Rating article={this.props.article}/>
            </div>

            <p><Icon type="user" /> Author: {this.props.article.username}</p>
            <div>Category: <Tag color="blue" key="category" children={this.props.article.category}/></div>
            <div>Tags: {tags}</div>
            <p>Created in {this.stringify(this.props.article.submitTime)}.</p>
            <p>Last edited in {this.stringify(this.props.article.lastEditedTime)}.</p>
            {this.props.userState.status == Status.LoggedIn && this.props.userState.user.username == this.props.article.username 
            ? (<div><Link to={`/articles/${this.props.article.id}/edit`}><Icon type="edit"/> Edit</Link>
            <Popconfirm title="Do you really want to delete this article?" onConfirm={()=>this.props.deleteArticle(this.props.userState.user.token, this.props.article.id)}>
                <a><Icon type="delete" /> Delele</a>
                </Popconfirm>
                </div>
                )
            : [] }
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

export default connect(
    s=>({userState: s.user}),
    articlePageActions,
    (state,dispatch,ownProps: any)=>({ ...state, ...dispatch, article: ownProps.article})
)(ArticleSidePanel)