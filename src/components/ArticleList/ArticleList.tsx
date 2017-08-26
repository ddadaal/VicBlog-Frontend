import * as React from 'react';
import { actionCreators as listActions, ArticleListState } from '../../store/ArticleList';
import { actionCreators as filterActions, ArticleFilter } from '../../store/ArticleListFilter';
import { Spin, Alert, Icon } from 'antd';
import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import moment from 'moment';
import { PVState, PV } from '../../store/PV';

type ArticleListProps = ArticleListState & typeof listActions & typeof filterActions & {
    pvState: PVState,
    filter: ArticleFilter
};

class ArticleList extends React.Component<ArticleListProps, any>{


    toggleCategory(category: string) {
        this.props.rewriteFilter({
            ...this.props.filter,
            categories: this.props.filter.categories.indexOf(category) > -1 ? this.props.filter.categories.filter(x => x !== category) : this.props.filter.categories.concat([category])
        });
    }

    toggleTag(tag: string) {
        this.props.rewriteFilter({
            ...this.props.filter,
            tags: this.props.filter.tags.indexOf(tag) > -1 ? this.props.filter.tags.filter(x => x !== tag) : this.props.filter.tags.concat([tag])
        });
    }

    render() {

        return this.props.articleList.content.length ? (
            <div>
                {this.props.articleList.content.map(item => <ArticleCard selectedCategories={this.props.filter.categories} selectedTags={this.props.filter.tags} toggleCategory={c => this.toggleCategory(c)} toggleTag={c => this.toggleTag(c)} pvState={this.props.pvState.get(item.id)} key={item.id} brief={item} />)}
            </div>
        ) : (
                <Alert type="info" message="Ah... There is nothing to show here."></Alert>
            );
    }

}

export default connect(
    s => ({ ...s.articleList, filter: s.articleFilter.filter,  pvState: s.pv, }),
    {...listActions, ...filterActions}
)(ArticleList);