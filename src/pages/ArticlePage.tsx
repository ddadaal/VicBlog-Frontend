import * as React from 'react';
import { Row, Col } from 'antd';
import { ArticlePanel } from '../components/ArticlePanel';
import { ArticleSidePanel } from '../components/ArticleSidePanel';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { actionCreators, ArticlePageState } from '../store/ArticlePage';

type ArticlePageProps = ArticlePageState & typeof actionCreators & { params: { ID: number }} ; 

class ArticlePage extends React.Component<ArticlePageProps,void>{

    componentDidMount(){
        this.props.requestArticle(this.props.params.ID);
    }

    render(){
        const padding = {padding: "8px 8px 8px 8px"};
        return this.props.article ? 
        (<div>
        <Row type="flex">
            <Col style={padding}  lg={{span: 6, order: 1}} md={{span:6, order: 1}} sm={{span:24, order: 2}} xs={{span:24, order: 2}}>
            <ArticleSidePanel article={this.props.article}/>
            </Col>
            <Col style={padding} lg={{span: 18, order: 2}} md={{span:18, order: 2}} sm={{span:24, order: 1}} xs={{span:24, order: 1}} >
            <ArticlePanel article={this.props.article} />
            </Col>
        </Row>
        </div>) : (
            <div>
                Loading
            </div>
        )
    }
}

export default connect(
    (s:ApplicationState)=>s.articlePage,
    actionCreators
)(ArticlePage);