import * as React from 'react';
import {connect } from 'react-redux';
import ArticleEditor from '../components/ArticleEditor';

import { actionCreators, ArticlePageState} from '../store/ArticlePage';
type EditPageProps = ArticlePageState & typeof actionCreators & { params:{ID: string}};

class EditPage extends React.Component<EditPageProps,void>{

    componentDidMount(){
        this.props.requestArticle(this.props.params.ID);
    }

    render(){
        return <ArticleEditor initialArticle={this.props.article}/>;
    }
}

export default connect(
    s=>s.articlePage,
    actionCreators,
)(EditPage);
