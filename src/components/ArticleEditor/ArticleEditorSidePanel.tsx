import * as React from 'react';
import { Checkbox, Radio, Input, Rate, Upload } from 'antd';
import { connect } from 'react-redux';
import { actionCreators as composeActions } from '../../store/ComposeArticle';
import { actionCreators as listActions, ArticleListState } from '../../store/ArticleList';
import { TagSelector } from '../common/TagSelector';


type ComposeArticleSidePanelProps = {
    selectedTags: string[],
    selectedCategory: string,
    availableTags: string[],
    availableCategories: string[],
    rate: number
} & typeof composeActions & typeof listActions;

class ArticleEditorSidePanel extends React.Component<ComposeArticleSidePanelProps, void>{
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.requestAllTags();
        this.props.requestAllCategories();
    }

    render() {
        return <div>
            Select a category or input a new one:<br />
            <Radio.Group onChange={e => { console.log(e.target.value); this.props.changeCategory(e.target.value); }} value={this.props.selectedCategory}>
                {this.props.availableCategories.map(item => <Radio key={item} value={item}>{item}</Radio>)}
            </Radio.Group>
            <Input placeholder="New category..." value={this.props.selectedCategory} onChange={e => this.props.changeCategory((e.target as any).value)} />
            <hr />
            Select tags or input new ones: <br />
            <TagSelector availableTags={this.props.availableTags} selectedTags={this.props.selectedTags} onSelectedChanged={values => this.props.changeTags(values)} />
            <hr />
            Set a rate in your opinion:<br />
            <Rate value={this.props.rate} onChange={value => this.props.changeRate(value)} />
            <hr/>
        </div>;
    }
}

export default connect(
    s => ({ selectedTags: s.composeArticle.selectedTags, selectedCategory: s.composeArticle.selectedCategory, availableTags: s.articleList.tags.content, availableCategories: s.articleList.categories.content, rate: s.composeArticle.rate }),
    { ...composeActions, ...listActions }
)(ArticleEditorSidePanel);