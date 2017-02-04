import * as React from 'react';
import { actionCreators, ArticleFilter, ArticleListState } from '../store/ArticleList';
import { Input, Checkbox, Button } from 'antd';
import { connect }from 'react-redux';
import { ApplicationState } from '../store';

const Search = Input.Search;

type ArticleListSiderProps = typeof actionCreators & ArticleListState;

class ArticleListSider extends React.Component<ArticleListSiderProps, void>{
    componentDidMount(){
        this.props.requestAllTags();
        this.props.requestAllCategories();
        this.props.requestArticleList();
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

    handleTitleTextChange(e){
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

    startSearch(){
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
                <Input placeholder="Search Text" onChange={e=>this.handleTitleTextChange(e)} value={this.props.filter.titleText} />
                <br />
                <p>Select Tags</p>
                <Checkbox.Group options={this.props.tags.content} value={this.props.filter.tags} onChange={e=>this.handleTagsChange(e)}/>
                <br />
                <p>Select Categories</p>
                <Checkbox.Group options={this.props.categories.content} value={this.props.filter.categories} onChange={e=>this.handleCategoriesChange(e)}/>
                <br />
                <Button type="primary" onClick={() => this.startSearch()}>Search</Button>
                <Button type="ghost" onClick={() => this.reset()}>Reset</Button>
            </div>
        );
    }


}

export default connect(
    (state:ApplicationState)=>state.articleList,
    actionCreators
)(ArticleListSider);