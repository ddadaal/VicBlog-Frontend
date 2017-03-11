import * as React from 'react';
import { Row, Col, Spin, Alert, notification } from 'antd';
import { ArticlePanel, CommentPanel } from '../components/ArticlePage';
import { ApplicationState } from '../store';
import { ArticleListUpdateMinutesSpan, padding, twoColStyleLeft, twoColStyleRight } from '../Utils';
import { UserState, actionCreators as userActions } from '../store/User';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actionCreators, ArticlePageState, PageStatus } from '../store/ArticlePage';

type ArticlePageProps = typeof userActions & typeof actionCreators & ArticlePageState & { params: { ID: string }, expire: () => any };

class ArticlePage extends React.Component<ArticlePageProps, void>{

    componentDidMount() {
        this.props.requestArticle(this.props.params.ID);

    }

    componentDidUpdate() {
        if (this.props.pageStatus == PageStatus.Deleting) {
            notification.info({
                message: "Deleting",
                description: "This article is being deleted...",
                duration: null
            });
        }
        if (Date.now() - this.props.lastUpdatedTime > ArticleListUpdateMinutesSpan *60 *60){
            this.props.requestArticle(this.props.params.ID);
        }

    }

    render() {


        document.title = "Article - VicBlog";

        let message = "";
        switch (this.props.pageStatus) {
            case PageStatus.NotFound:
                message = `Article ${this.props.params.ID} is not found.`;
                break;
            case PageStatus.Deleted:
                notification.destroy();
                message = "This article has been deleted.";
                break;
            case PageStatus.Others:
                message = "Internal Error. Please retry.";
                break;
        };

        let indicator = message ? <div><Alert type="error" message={message} /><a onClick={() => this.componentDidMount()}>Retry</a></div> : [];

        if (this.props.pageStatus == PageStatus.Requesting) {
            indicator = <Alert type="info" message="Loading..." />;
        }

        return <div type="flex" style={{maxWidth:"1000px", marginLeft: "auto", marginRight: "auto" }}>
            {this.props.pageStatus == PageStatus.Received ? (<div>
                <ArticlePanel article={this.props.article} />
                <CommentPanel articleID={this.props.params.ID} /></div>)
                : indicator}
        </div >;
    }
}

export default connect(
    (s: ApplicationState) => s.articlePage,
    { ...actionCreators, ...userActions }
)(ArticlePage);