import * as React from 'react';
import { actionCreators, ArticleListState, ContentStatus } from '../../store/ArticleList';
import { ArticleFilterState, actionCreators as filterActions, ArticleBriefListOrder, orderDescription, initialState } from '../../store/ArticleListFilter';
import { Input, Checkbox, Button, Card, Icon, Alert, Tag, Dropdown, Menu, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ArticleListUpdateMinutesSpan } from '../../Utils';
import { actionCreators as pvActions, PVState } from '../../store/PV';

import moment from 'moment';
import DateSelector from './DateSelector';

const CheckableTag = Tag.CheckableTag;

const Search = Input.Search;

type ArticleListSiderProps = typeof actionCreators & ArticleListState & typeof filterActions & ArticleFilterState;

class ArticleListSider extends React.Component<ArticleListSiderProps, any>{
    componentDidMount() {
        if (this.props.expired || Date.now() - this.props.articleList.lastUpdatedTime > ArticleListUpdateMinutesSpan * 60 * 1000) {

            this.props.requestAllTags();
            this.props.requestAllCategories();
            this.props.requestArticleList(this.props.filter);
        }

    }

    handleTagsChange(checkedValues) {
        this.props.rewriteFilter({
            ...this.props.filter,
            tags: checkedValues
        });
    }
    handleCategoriesChange(checkedValues) {
        this.props.rewriteFilter({
            ...this.props.filter,
            categories: checkedValues
        });
    }

    handleTitleTextChange(e) {
        this.props.rewriteFilter({
            ...this.props.filter,
            titleText: e.target.value
        });
    }

    handleCreatedTimePeriodChange(date: [moment.Moment, moment.Moment], dateString: [string, string]) {
        this.props.rewriteFilter({
            ...this.props.filter,
            createdTimeRange: [moment(dateString[0],"YYYY-MM-DD").valueOf(), moment(dateString[1],"YYYY-MM-DD").valueOf()]
        });
    }

    handleEditedTimePeriodChange(date: [moment.Moment, moment.Moment], dateString: [string, string]) {
        this.props.rewriteFilter({
            ...this.props.filter,
            editedTimeRange: [date[0].valueOf(), date[1].valueOf()]
        });
    }
    formatMoment() {

    }

    reset() {
        this.props.rewriteFilter(initialState.filter);
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

        const menu = <Menu>
            {[0, 1, 2, 3, 4, 5, 6].map(x =>
                (<Menu.Item key={x} >
                    <a onClick={() => this.props.rewriteFilter({ ...this.props.filter, order: x })}>{orderDescription[x]}</a>
                </Menu.Item>)
            )}
        </Menu>;

        const { RangePicker } = DatePicker;

        return (
            <div>
                {this.props.articleList.status == ContentStatus.Network ? <Alert type="error" message="Network error. Please check your network connection. " /> : []}
                {this.props.articleList.status == ContentStatus.Others ? <Alert type="error" message="Something bad happened. Please retry." /> : []}
                <Card title={<span><Icon type="filter" /> Filter</span>}>
                    <Input placeholder="Text in Title" onChange={e => this.handleTitleTextChange(e)} value={this.props.filter.titleText} />
                    <br />
                    <div><Icon type="tags" /> Tags</div>
                    <Checkbox.Group options={this.props.tags.content} value={this.props.filter.tags} onChange={e => this.handleTagsChange(e)} />
                    <br />
                    <div><Icon type="tag-o" /> Categories</div>
                    <Checkbox.Group options={this.props.categories.content} value={this.props.filter.categories} onChange={e => this.handleCategoriesChange(e)} />
                    <br />
                    <DateSelector iconName="clock-circle-o" message="Created Time Range" enabled={this.props.filter.createdTimeEnabled} onEnabledChange={() => this.props.rewriteFilter({ ...this.props.filter, createdTimeEnabled: !this.props.filter.createdTimeEnabled })} onChange={(date, dateString) => this.handleCreatedTimePeriodChange(date, dateString)} />
                    <br />
                    <DateSelector iconName="clock-circle" message="Edited Time Range" enabled={this.props.filter.editedTimeEnabled} onEnabledChange={() => this.props.rewriteFilter({ ...this.props.filter, editedTimeEnabled: !this.props.filter.editedTimeEnabled })} onChange={(date, dateString) => this.handleEditedTimePeriodChange(date, dateString)} />
                    <br />
                    <div><Icon type="bars" /> Order by</div>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <a className="ant-dropdown-link">
                            {orderDescription[this.props.filter.order]} <Icon type="down" />
                        </a>
                    </Dropdown>

                    <br />
                    <hr />
                    <Button icon="check" type="primary" onClick={() => this.startSearch()} loading={this.props.searching}>{this.props.searching ? "Refreshing" : "Filter"}</Button>
                    <Button icon="close" type="ghost" onClick={() => this.reset()}>Reset</Button>
                </Card>
                <br />
                Last updated in {moment(this.props.articleList.lastUpdatedTime).format("MMM Do, YYYY, HH:mm:ss")}.
            <br />
                {this.props.articleList.status != ContentStatus.Requesting
                    ? <a onClick={() => {
                        this.props.requestAllCategories();
                        this.props.requestAllTags();
                        this.props.requestArticleList();
                    }}><Icon type="reload" /> Click this to perform a full reload</a>
                    : <a> <Icon type="reload" spin /> Refreshing</a>}

            </div>
        );
    }


}

export default connect(
    (state: ApplicationState) => ({ ...state.articleList, ...state.articleFilter }),
    { ...actionCreators, ...filterActions, }
)(ArticleListSider);