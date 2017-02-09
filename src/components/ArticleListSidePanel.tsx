import * as React from 'react';
import { actionCreators, ArticleFilter, ArticleListState, ErrorType } from '../store/ArticleList';
import { Input, Checkbox, Button, Card,Icon, Alert } from 'antd';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import moment from 'moment';

const Search = Input.Search;

type ArticleListSiderProps = typeof actionCreators & ArticleListState;

class ArticleListSider extends React.Component<ArticleListSiderProps, void>{
    componentDidMount() {
        if (  Date.now() - this.props.lastUpdatedTime> 60 * 60 * 60) {
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
                 {this.props.articleList.errorInfo == ErrorType.Network ? <Alert type="error" message="Network error. Please check your network connection. "/> :[]}
                {this.props.articleList.errorInfo == ErrorType.Others ? <Alert type="error" message="Something bad happened. Please retry."/> : []}
                <Card title={<span><Icon type="filter" /> Filter</span>}>
                    <Input placeholder="Text in Title " onChange={e => this.handleTitleTextChange(e)} value={this.props.filter.titleText} />
                    <br />
                    <div><Icon type="tags" /> Tags</div>
                    <Checkbox.Group options={this.props.tags.content} value={this.props.filter.tags} onChange={e => this.handleTagsChange(e)} />
                    <div><Icon type="tag-o" /> Categories</div>
                    <Checkbox.Group options={this.props.categories.content} value={this.props.filter.categories} onChange={e => this.handleCategoriesChange(e)} />
                    <br />
                    <Button type="primary" onClick={() => this.startSearch()} loading={this.props.searching}><Icon type="check" /> Search</Button>
                    <Button type="ghost" onClick={() => this.reset()}><Icon type="close" /> Reset</Button>
                </Card>
                <br />
                Last updated in {moment(this.props.lastUpdatedTime).format("HH:mm:ss")}.
            <br />
                {!this.props.articleList.requesting 
                ? <a onClick={() => this.props.requestArticleList()}><Icon type="reload" /> Click this to perform a full reload</a>
                : <a disabled> <Icon type="reload" spin /> Refreshing</a>}
               
            </div>
        );
    }


}

export default connect(
    (state: ApplicationState) => state.articleList,
    actionCreators
)(ArticleListSider);