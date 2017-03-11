import * as React from 'react';
import { ArticleFilter, ArticleFilterState, actionCreators } from '../../store/ArticleListFilter'
import { Card, Tag, Rate, Icon } from 'antd';
import { APIs, pathCombine, attachQueryString } from '../../Utils';
import { Link } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';

type ArticleCardProps = typeof actionCreators & ArticleFilterState & {
    brief: ArticleBrief,
}

type ArticleCardStates = {
    pvFetching: boolean,
    pv: number,
    pvError: boolean
}

class ArticleCard extends React.Component<ArticleCardProps, ArticleCardStates>{

    constructor() {
        super();
        this.state = {
            pvFetching: false,
            pv: -1,
            pvError: false
        };
    }

    componentDidMount(){
        this.fetchPV();
    }

    fetchPV() {
        this.setState({ pvFetching: true });
        fetch(`${APIs.pv}?ID=${this.props.brief.id}`).then(res => res.json()).then(value => this.setState({
            pvFetching: false,
            pvError: false,
            pv: value as any
        })).catch(res=>this.setState({ pvFetching: false, pvError: true }));
    }

    handleCategoryClick(category: string) {
        this.props.changeFilter({
            ...this.props.filter,
            categories: this.props.filter.categories.indexOf(category) > -1 ? this.props.filter.categories.filter(x => x !== category) : this.props.filter.categories.concat([category])
        });
    }

    handleTagClick(tag: string) {
        this.props.changeFilter({
            ...this.props.filter,
            tags: this.props.filter.tags.indexOf(tag) > -1 ? this.props.filter.tags.filter(x => x !== tag) : this.props.filter.categories.concat([tag])
        })
    }

    render() {
        const url = pathCombine(APIs.articles, this.props.brief.id);
        const tags = this.props.brief.tags.map(item => <Tag key={item} ><a onClick={() => this.handleTagClick(item)}>{item}</a></Tag>);
        return <Card title={<div>
            <Tag key="category" color="blue"> <a onClick={() => this.handleCategoryClick(this.props.brief.category)}>{this.props.brief.category}</a></Tag>
            <Link to={`/articles/${this.props.brief.id}`}>{this.props.brief.title}</Link>
        </div>}>
            <div>
                <div><Icon type="tags" /> {tags}</div>
                <div>Rate: <Rate defaultValue={this.props.brief.rate} disabled allowHalf /> {this.props.brief.rate.toFixed(1)} </div>
                <br />
                <p><Icon type="clock-circle-o" /> Created in {moment.utc(this.props.brief.submitTime).local().format("MMMM Do, YYYY, HH:mm")}</p>
                <p><Icon type="clock-circle" /> Edited in {moment.utc(this.props.brief.lastEditedTime).local().format("MMMM Do, YYYY, HH:mm")}</p>
                <p><Icon type="like-o" /> { this.state.pvFetching ? "Fetching PV...": this.state.pvError ? "Error fetching pv." : `Viewed by ${this.state.pv} times.`}</p>
                <p><Icon type="user" /> By {this.props.brief.username}</p>
            </div>
        </Card>
    }
}

export default connect(
    s => s.articleFilter,
    actionCreators,
    (state, dispatch, ownProps: any) => ({ ...state, ...dispatch, brief: ownProps.brief })
)(ArticleCard);