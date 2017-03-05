import * as React from 'react';
import ArticleEditor from '../components/ArticleEditor/ArticleEditor';
import { connect } from 'react-redux';
import { actionCreators} from '../store/ComposeArticle';

type ComposePageProps = typeof actionCreators;

class ComposePage extends React.Component<ComposePageProps, void>{
    render(){
        this.props.resetStatus();
        return <ArticleEditor/>;
    }
}

export default connect(
    s=>({}),
    actionCreators
)(ComposePage);