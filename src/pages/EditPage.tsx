import * as React from 'react';
import { connect } from 'react-redux';
import { ArticleStatus } from '../store/ArticlePage';
import { Alert, Button } from 'antd';
import { Link } from 'react-router';
import ArticleEditor from '../components/ArticleEditor/ArticleEditor';

import { actionCreators, ArticlePagesState } from '../store/ArticlePage';
type EditPageProps = typeof actionCreators & { params: { ID: string }, articles: any };

class EditPage extends React.Component<EditPageProps, void>{

    componentDidMount() {
        const article = this.props.articles[this.props.params.ID];
        if (!status || (article.status != ArticleStatus.Expired && article.status != ArticleStatus.Received)) {
            this.props.requestArticle(this.props.params.ID);
        }
    }

    render() {
        const article = this.props.articles[this.props.params.ID];
        if (article && article.status == ArticleStatus.Expired){
            return <div type="flex" style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                <Alert type="success" message="Patching successful."/>
                <Link to={`/articles/${this.props.params.ID}`}>Click to redirect!</Link>
            </div >;
        }
        if (!article || article.status != ArticleStatus.Received) {
            return <div type="flex" style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
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
