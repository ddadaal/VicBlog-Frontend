import * as React from 'react';
import { Row, Col, Spin, Alert, notification } from 'antd';
import { ArticlePanel, CommentPanel } from '../components/ArticlePage';
import { ApplicationState } from '../store';
import { ArticleListUpdateMinutesSpan, padding, twoColStyleLeft, twoColStyleRight, ArticleFetchMinutesSpan } from '../Utils';
import { UserState, actionCreators as userActions } from '../store/User';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actionCreators, ArticlePagesState, ArticleStatus } from '../store/ArticlePage';

type ArticlePageProps = typeof userActions & typeof actionCreators & { params: { ID: string }, expire: () => any, articles: any };

class ArticlePage extends React.Component<ArticlePageProps, void>{

    componentDidMount() {
        if (!this.props.articles[this.props.params.ID] || this.props.articles[this.props.params.ID].status == ArticleStatus.Expired || Date.now() - this.props.articles[this.props.params.ID].updatedTime > ArticleFetchMinutesSpan * 60 * 1000) {
            this.props.requestArticle(this.props.params.ID);
        }


    }

    componentDidUpdate() {
        if (!this.props.articles[this.props.params.ID]) {
            return;
        }
        if (this.props.articles[this.props.params.ID].pageStatus == ArticleStatus.Deleting) {
            notification.info({
                message: "Deleting",
                description: "This article is being deleted...",
                duration: null
            });
        }
        if (Date.now() - this.props.articles[this.props.params.ID].lastUpdatedTime > ArticleListUpdateMinutesSpan * 60 * 60) {
            this.props.requestArticle(this.props.params.ID);
        }

    }

    render() {


        const articleObject = this.props.articles[this.props.params.ID];

        if (!articleObject || articleObject.status == ArticleStatus.Requesting) {
            return <div type="flex" style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Alert type="info" message="Loading..." />
            </div >;
        }

        document.title = `${articleObject.article.title} - VicBlog`;

        let message = "";
        switch (articleObject.status) {
            case ArticleStatus.NotFound:
                message = `Article ${this.props.params.ID} is not found.`;
                break;
            case ArticleStatus.Deleted:
                notification.destroy();
                message = "This article has been deleted.";
                break;
            case ArticleStatus.Others:
                message = "Internal Error. Please retry.";
                break;
        };

        const indicator = message ? <div><Alert type="error" message={message} /><a onClick={() => this.componentDidMount()}>Retry</a></div> : [];

        return <div type="flex" style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
            {articleObject.status == ArticleStatus.Received ? (<div>
                <ArticlePanel article={articleObject.article} />
                <CommentPanel articleID={this.props.params.ID} /></div>)
                : indicator}
        </div >;
    }
}

export default connect(
    (s: ApplicationState) => ({ articles: s.articlePage }),
    { ...actionCreators, ...userActions }
)(ArticlePage);