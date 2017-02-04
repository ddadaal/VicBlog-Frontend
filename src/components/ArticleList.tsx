import * as React from 'react';
import { ApplicationState } from '../store';
import { actionCreators, ArticleListState, ArticleFilter } from '../store/ArticleList';
import { Spin } from 'antd';
import { ArticleCard } from '../components/ArticleCard';
import { connect} from 'react-redux';
import { ArticleListUpdateMinutesSpan } from '../Utils';
import moment from 'moment';

type ArticleListProps = ArticleListState & typeof actionCreators;

class ArticleList extends React.Component<ArticleListProps, void>{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const filter: ArticleFilter = null;
        let now = moment.now();
        console.log(now);
    }

    render() {
        return <p>23asd3</p>;
    }

}

export default connect(
    (s:ApplicationState)=>s.articleList,
    actionCreators
)(ArticleList);