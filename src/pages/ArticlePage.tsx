import * as React from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import { ArticlePanel } from '../components/ArticlePanel';
import { ArticleSidePanel } from '../components/ArticleSidePanel';
import { ApplicationState } from '../store';
import {ArticleListUpdateMinutesSpan } from '../Utils';
import { UserState, actionCreators as userActions } from '../store/User';
import { connect } from 'react-redux';
import { actionCreators, ArticlePageState, Status } from '../store/ArticlePage';
import CommentPanel from '../components/CommentPanel';

type ArticlePageProps = typeof userActions & typeof actionCreators & ArticlePageState & { params: { ID: string }, userState: UserState, expire:()=>any };

class ArticlePage extends React.Component<ArticlePageProps, void>{

    componentDidMount() {
        this.props.requestArticle(this.props.params.ID);

    }

    render() {

        document.title = "Article - VicBlog";

        const padding = { padding: "8px 8px 8px 8px" };
        let message = "";
        switch (this.props.pageStatus) {
            case Status.Network:
                message = "Network error. Please check your network connection.";
                break;
            case Status.NotFound:
                message = `Article ${this.props.params.ID} is not found.`;
                break;
            default:
                message = "Internal Error. Please retry.";
        };
        let indicator = <div><Alert type="error" message={message} /><a onClick={() => this.componentDidMount()}>Retry</a></div>;
        if (this.props.pageStatus == Status.Requesting) {
            indicator = <Alert type="info" message="Loading..." />;
        }

        return this.props.pageStatus == Status.Received ?
            (<div>
                <Row type="flex">
                    <Col style={padding} lg={{ span: 6, order: 1 }} md={{ span: 6, order: 1 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
                        <ArticleSidePanel article={this.props.article}/>
                    </Col>
                    <Col style={padding} lg={{ span: 18, order: 2 }} md={{ span: 18, order: 2 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }} >
                        <ArticlePanel article={this.props.article} />
                        <CommentPanel articleID={this.props.params.ID} />
                    </Col>
                </Row>
            </div>) : indicator;
    }
}

export default connect(
    (s: ApplicationState) => ({ ...s.articlePage, userState: { ...s.user } }),
    { ...actionCreators, ...userActions }
)(ArticlePage);