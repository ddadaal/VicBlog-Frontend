import * as React from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'antd';
import { Link } from 'react-router-dom';
import ArticleEditor from '../components/ArticleEditor/ArticleEditor';
import App from './App';
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

        var mainContent = null;

        if (article && article.status == ArticleStatus.Expired) {
            mainContent = <div style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Alert type="success" message="Patching successful." />
                <Link to={`/articles/${this.props.params.ID}`}>Click to redirect!</Link>
            </div >;
        } else if (!article || article.status != ArticleStatus.Received) {
            mainContent = <div style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Alert type="info" message="Loading..." />
            </div >;
        } else {
            mainContent = <ArticleEditor initialArticle={article.article} />;
        }

        return <App>{mainContent}</App>;
    }
}

export default connect(
    s => ({ articles: s.articlePage }),
    actionCreators,
)(EditPage);
