import * as React from 'react';
import { ArticleFilter, ArticleFilterState, actionCreators } from '../../store/ArticleListFilter'
import { Card, Tag, Rate, Icon } from 'antd';
import { APIs, pathCombine, attachQueryString, PVFetchSecondsSpan } from '../../Utils';
import { Link } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';
import { actionCreators as pvActions, PVState, PV } from '../../store/PV';


type ArticleCardOwnProps = {
    brief: ArticleBrief,
    pvState: PV,
    toggleCategory: (category:string)=>any,
    toggleTag: (tag:string)=>any,
    selectedTags: string[],
    selectedCategories: string[]
}

type ArticleCardProps =  ArticleCardOwnProps & typeof pvActions;


class ArticleCard extends React.Component<ArticleCardProps, void>{
    componentDidMount() {
        const state = this.props.pvState;
        if (!state || (Date.now() - state.updatedTime) > PVFetchSecondsSpan*1000) {
            this.props.fetchPV(this.props.brief.id);
        }
    }


    handleCategoryClick(category: string) {
        this.props.toggleCategory(category);
    }

    handleTagClick(tag: string) {
        this.props.toggleTag(tag);
    }

    render() {
        const url = pathCombine(APIs.articles, this.props.brief.id);
        const state = this.props.pvState;
        
        const tags = this.props.brief.tags.map(item => <Tag key={item} color={ this.props.selectedTags.indexOf(item)>-1 ? "#108ee9" : ""} ><a onClick={() => this.handleTagClick(item)}>{item}</a></Tag>);
        return <Card title={<div>
            <Tag key="category" color={this.props.selectedCategories.indexOf(this.props.brief.category)>-1 ? "#2db7f5":"blue"}> <a onClick={() => this.handleCategoryClick(this.props.brief.category)}>{this.props.brief.category}</a></Tag>
            <Link to={`/articles/${this.props.brief.id}`}>{this.props.brief.title}</Link>
        </div>}>
            <div>
                <div><Icon type="tags" /> {tags}</div>
                <div>Rate: <Rate defaultValue={this.props.brief.rate} disabled allowHalf /> {this.props.brief.rate.toFixed(1)} </div>
                <br />
                <p><Icon type="clock-circle-o" /> Created in {moment.utc(this.props.brief.submitTime).local().format("MMMM Do, YYYY, HH:mm")}</p>
                <p><Icon type="clock-circle" /> Edited in {moment.utc(this.props.brief.lastEditedTime).local().format("MMMM Do, YYYY, HH:mm")}</p>
                <p><Icon type="like-o" /> { !(state && !state.fetching) ? "Fetching PV..." : state.error ? "Error fetching pv." : `Viewed by ${state.pv} times`}</p>
                <p><Icon type="user" /> By {this.props.brief.username}</p>
            </div>
        </Card>
    }
}

export default connect(
    s=>({}),
    pvActions,
    (state, dispatch, ownProps: ArticleCardOwnProps) => ({...state, ...dispatch, ...ownProps})
)(ArticleCard);