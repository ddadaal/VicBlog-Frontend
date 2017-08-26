import * as React from 'react';
import { Row, Col, Spin, Alert, notification } from 'antd';
import { ArticlePanel, CommentPanel } from '../components/ArticlePage';
import { ApplicationState } from '../store';
import { ArticleListUpdateMinutesSpan, padding, twoColStyleLeft, twoColStyleRight, ArticleFetchMinutesSpan, errorMessage } from '../Utils';
import { UserState, actionCreators as userActions } from '../store/User';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators, ArticlePagesState, ArticleStatus, ArticleState } from '../store/ArticlePage';

type ArticlePageProps = typeof userActions & typeof actionCreators & { params: { ID: string }, expire: () => any, articles: ArticlePagesState };

class ArticlePage extends React.Component<ArticlePageProps, any>{


    componentDidMount() {
        const state = this.props.articles.get(this.props.params.ID);
        if (!state || state.status == ArticleStatus.Expired || Date.now() - state.lastUpdatedTime > ArticleFetchMinutesSpan * 60 * 1000) {
            this.props.requestArticle(this.props.params.ID);
        }


    }

    componentDidUpdate() {
        const state = this.props.articles.get(this.props.params.ID);

        if (!state) {
            return;
        }
        if (state.status == ArticleStatus.Deleting) {
            notification.info({
                message: "Deleting",
                description: "This article is being deleted...",
                duration: null
            });
        }
        if (Date.now() - state.lastUpdatedTime > ArticleListUpdateMinutesSpan * 60 * 60) {
            this.props.requestArticle(this.props.params.ID);
        }

    }

    constructIndicator(articleObject: ArticleState){
        switch (articleObject.status) {
            case ArticleStatus.NotFound:
                return <div><Alert type="error" message={`Article ${this.props.params.ID} is not found.`} /><a onClick={() => this.props.requestArticle(this.props.params.ID)}>Retry</a></div> ;
            case ArticleStatus.Deleted:
                notification.destroy();
                return <div><Alert type="success" message={`Article ${this.props.params.ID} has been deleted.`} /><Link to="/articles">Back to List</Link></div> ;
            case ArticleStatus.Others:
                return <div><Alert type="error" message={errorMessage.Others} /><a onClick={() => this.props.requestArticle(this.props.params.ID)}>Retry</a></div> ;
            default:
                return <div/>;
        };
    }

    render() {


        const articleObject = this.props.articles.get(this.props.params.ID);

        if (!articleObject || articleObject.status == ArticleStatus.Requesting) {
            return <div style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Alert type="info" message="Loading..." />
            </div >;
        }

        document.title = `${articleObject.article.title} - VicBlog`;

        return <div style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
            {articleObject.status == ArticleStatus.Received ? (<div>
                <ArticlePanel article={articleObject.article} />
                <CommentPanel articleID={this.props.params.ID} /></div>)
                : this.constructIndicator(articleObject)}
        </div >;
    }
}

export default connect(
    (s: ApplicationState) => ({ articles: s.articlePage }),
    { ...actionCreators, ...userActions }
)(ArticlePage);