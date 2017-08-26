import * as React from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'antd';
import { Link } from 'react-router-dom';
import ArticleEditor from '../components/ArticleEditor/ArticleEditor';

import { ArticleStatus, ArticleState, actionCreators, ArticlePagesState } from '../store/ArticlePage';
type EditPageProps = typeof actionCreators & { params: { ID: string }, articles: ArticlePagesState };

class EditPage extends React.Component<EditPageProps, any>{

    componentDidMount() {
        const article = this.props.articles.get(this.props.params.ID);
        if (!status || (article.status != ArticleStatus.Expired && article.status != ArticleStatus.Received)) {
            this.props.requestArticle(this.props.params.ID);
        }
    }

    render() {
        const article = this.props.articles.get(this.props.params.ID);
        if (article && article.status == ArticleStatus.Expired){
            return <div style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Alert type="success" message="Patching successful."/>
                <Link to={`/articles/${this.props.params.ID}`}>Click to redirect!</Link>
            </div >;
        }
        if (!article || article.status != ArticleStatus.Received) {
            return <div style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Alert type="info" message="Loading..." />
            </div >;
        }

        return <ArticleEditor initialArticle={article.article} />;
    }
}

export default connect(
    s => ({ articles: s.articlePage }),
    actionCreators,
)(EditPage);
