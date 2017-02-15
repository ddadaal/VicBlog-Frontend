import * as React from 'react';
import ArticleListSidePanel from '../components/ArticleListSidePanel';
import ArticleList from '../components/ArticleList';
import { Row ,Col } from 'antd';
import {connect} from 'react-redux';
import * as Store from '../store/ArticleList';
import { Link } from 'react-router';
import { twoColStyleLeft, twoColStyleRight, padding } from '../Utils';


export class ArticleListPage extends React.Component<void, void>{

    render() {
        document.title = "Articles - VicBlog";
        return <div>
        <Row type="flex">
            <Col style={padding}  {...twoColStyleLeft}>
            <ArticleListSidePanel/>
            </Col>
            <Col style={padding} {...twoColStyleRight} >

            <ArticleList />
            </Col>
        </Row>
        </div>;
    }

}