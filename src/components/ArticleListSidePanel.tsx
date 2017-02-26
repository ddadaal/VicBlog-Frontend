import * as React from 'react';
import { actionCreators, ArticleListState, Status } from '../store/ArticleList';
import { ArticleFilterState, actionCreators as filterActions} from '../store/ArticleListFilter';
import { Input, Checkbox, Button, Card, Icon, Alert, Tag } from 'antd';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import {ArticleListUpdateMinutesSpan } from '../Utils';
import moment from 'moment';

const CheckableTag=Tag.CheckableTag;

const Search = Input.Search;

type ArticleListSiderProps = typeof actionCreators & ArticleListState & typeof filterActions & ArticleFilterState;

class ArticleListSider extends React.Component<ArticleListSiderProps, void>{
    componentDidMount() {
        if (Date.now() - this.props.articleList.lastUpdatedTime > ArticleListUpdateMinutesSpan * 60 * 60 || this.props.expired) {
            
            this.props.requestAllTags();
            this.props.requestAllCategories();
            this.props.requestArticleList();
        }

    }

    handleTagsChange(checkedValues) {
        this.props.changeFilter({
            ...this.props.filter,
            tags: checkedValues
        });
    }
    handleCategoriesChange(checkedValues) {
        this.props.changeFilter({
            ...this.props.filter,
            categories: checkedValues
        });
    }

    handleTitleTextChange(e) {
        this.props.changeFilter({
            ...this.props.filter,
            titleText: e.target.value
        });
    }

    reset() {
        this.props.changeFilter({
            titleText: "",
            categories: [],
            tags: []
        });
        this.props.requestArticleList();
    }

    startSearch() {
        this.props.requestArticleList(this.props.filter);
    }

    render() {

        const tags = this.props.tags.content.map(item => (
            <Checkbox onChange={e => this.handleTagsChange(e)} key={item}>{item}</Checkbox>
        ));

        const categories = this.props.categories.content.map(item => (
            <Checkbox onChange={e => this.handleCategoriesChange(e)} key={item}>{item}</Checkbox>
        ));

        return (
            <div>
                {this.props.articleList.status == Status.Network ? <Alert type="error" message="Network error. Please check your network connection. " /> : []}
                {this.props.articleList.status == Status.Others ? <Alert type="error" message="Something bad happened. Please retry." /> : []}
                {this.props.articleList.status == Status.Requesting ? <Alert type="info" message={<div><Icon type="reload" spin /> Refreshing... Please wait.</div>}/> : []}
                <Card title={<span><Icon type="filter" /> Filter</span>}>
                    <Input placeholder="Text in Title " onChange={e => this.handleTitleTextChange(e)} value={this.props.filter.titleText} />
                    <br />
                    <div><Icon type="tags" /> Tags</div>
                    <Checkbox.Group options={this.props.tags.content} value={this.props.filter.tags} onChange={e => this.handleTagsChange(e)} />
                    <div><Icon type="tag-o" /> Categories</div>
                    <Checkbox.Group options={this.props.categories.content} value={this.props.filter.categories} onChange={e => this.handleCategoriesChange(e)} />
                    <br />
                    <Button icon="check" type="primary" onClick={() => this.startSearch()} loading={this.props.searching}>Search</Button>
                    <Button icon="close" type="ghost" onClick={() => this.reset()}>Reset</Button>
                </Card>
                <br />
                Last updated in {moment(this.props.articleList.lastUpdatedTime).format("MMM Do, YYYY, HH:mm:ss")}.
            <br />
                {this.props.articleList.status != Status.Requesting
                    ? <a onClick={() => {
                        this.props.requestAllCategories();
                        this.props.requestAllTags();
                        this.props.requestArticleList();
                    }}><Icon type="reload" /> Click this to perform a full reload</a>
                    : <a disabled> <Icon type="reload" spin /> Refreshing</a>}

            </div>
        );
    }


}

export default connect(
    (state: ApplicationState) => ({...state.articleList,...state.articleFilter}),
    {...actionCreators,...filterActions}
)(ArticleListSider);