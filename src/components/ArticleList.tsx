import * as React from 'react';
import { ApplicationState } from '../store';
import { actionCreators, ArticleListState, ArticleBrief } from '../store/ArticleList';
import { Spin } from 'antd';
import ArticleCard from '../components/ArticleCard';
import { connect} from 'react-redux';
import moment from 'moment';

type ArticleListProps = ArticleListState;

class ArticleList extends React.Component<ArticleListProps, void>{


    render() {
        const cards = this.props.articleList.content.map(item=>{
            return <ArticleCard key={Math.random()} brief={item}/>;
        })
        return (
            <div>
            {cards}
            </div>
        );
    }

}

export default connect(
    (s: ApplicationState) => s.articleList,
    {}
)(ArticleList);