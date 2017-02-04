import * as React from 'react';
import { ApplicationState } from '../store';
import { actionCreators, ArticleListState, ArticleFilter, ErrorType } from '../store/ArticleList';
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
        const lastUpdated = moment.utc(this.props.lastUpdateTime);
        const now = moment.utc(moment.now());
        console.log(lastUpdated);
        if (!this.props.lastUpdateTime || now.subtract(lastUpdated).minute() >ArticleListUpdateMinutesSpan ){
            this.props.requestArticleList(filter);
        }
    }

    render() {
        if (!this.props.list) {
            if (this.props.isRequesting) {
                return <div><Spin /> Loading</div>;
            } else {
                if (this.props.errorInfo == ErrorType.Others)
                    return <div> Something's gone wrong! Please wait for a fix!</div>;
            }
        } else {
            const cards = this.props.list.map(item => {
                return <ArticleCard brief={item} />
            })
            return <div>
                {cards}
            </div>;
        }
    }

}

export default connect(
    (s:ApplicationState)=>s.articleList,
    actionCreators
)(ArticleList);