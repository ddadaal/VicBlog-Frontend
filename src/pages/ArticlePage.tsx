import * as React from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import { ArticlePanel } from '../components/ArticlePanel';
import { ArticleSidePanel } from '../components/ArticleSidePanel';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { actionCreators, ArticlePageState, ErrorType } from '../store/ArticlePage';
import CommentPanel from '../components/CommentPanel';

type ArticlePageProps = typeof actionCreators & ArticlePageState & { params: { ID: number } };

class ArticlePage extends React.Component<ArticlePageProps, void>{

    componentDidMount() {
        this.props.requestArticle(this.props.params.ID);
    }

    componentWillUnmount() {
        this.props.clearArticle();
    }

    render() {
        const padding = { padding: "8px 8px 8px 8px" };
        let message = "";
        switch (this.props.errorInfo) {
            case ErrorType.Network:
                message = "Network error. Please check your network connection.";
                break;
            case ErrorType.NotFound:
                message = `Article ${this.props.params.ID} is not found.`;
                break;
            default:
                message = "Internal Error. Please retry.";
        };
        const error = <div><Alert type="error" message={message} /><a onClick={() => this.componentDidMount()}>Retry</a></div>;
        return this.props.article ?
            (<div>
                <Row type="flex">
                    <Col style={padding} lg={{ span: 6, order: 1 }} md={{ span: 6, order: 1 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
                        <ArticleSidePanel article={this.props.article} />
                    </Col>
                    <Col style={padding} lg={{ span: 18, order: 2 }} md={{ span: 18, order: 2 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }} >
                        <ArticlePanel article={this.props.article} />
                        <CommentPanel articleID={this.props.params.ID} />
                    </Col>
                </Row>
            </div>) : (
                this.props.isRequesting ?
                    <div>
                        <Spin />Loading
                    </div> : error
            )
    }
}

export default connect(
    (s: ApplicationState) => s.currentArticlePage,
    actionCreators
)(ArticlePage);