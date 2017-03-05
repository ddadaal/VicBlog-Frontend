import * as React from 'react';
import { actionCreators, ArticleListState, Status } from '../../store/ArticleList';
import { Spin, Alert, Icon } from 'antd';
import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import moment from 'moment';

type ArticleListProps = ArticleListState;

class ArticleList extends React.Component<ArticleListProps, void>{


    render() {

        return this.props.articleList.content.length ? (
            <div>
             {this.props.articleList.content.map(item=><ArticleCard key={item.id} brief={item} />)}
            </div>
        ) : (
                <Alert type="info" message="Ah... There is nothing to show here."></Alert>
            );
    }

}

export default connect(
    s => s.articleList,
    {}
)(ArticleList);