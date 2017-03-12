import * as React from 'react';
import ArticleEditor from '../components/ArticleEditor/ArticleEditor';
import { connect } from 'react-redux';
import { Alert } from 'antd';
import { Link } from 'react-router';
import { actionCreators, ComposeArticleState, ArticleSubmitStatus } from '../store/ComposeArticle';

type ComposePageProps = ComposeArticleState & typeof actionCreators;

class ComposePage extends React.Component<ComposePageProps, void>{
    render() {
        if (this.props.submitStatus == ArticleSubmitStatus.Success) {
            return <div type="flex" style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Alert type="success" message="Submit successful!" />
                <Link to={`/articles/${this.props.resultArticle.id}`}>Click to redirect!</Link>
            </div >;
        }
        return <ArticleEditor />;
    }

    componentWillMount(){
        this.props.resetStatus();
    }
}

export default connect(
    s => s.composeArticle,
    actionCreators
)(ComposePage);