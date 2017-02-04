import * as React from 'react';
import ArticleListSidePanel from '../components/ArticleListSidePanel';
import ArticleList from '../components/ArticleList';
import { Row ,Col } from 'antd';
import {connect} from 'react-redux';
import * as Store from '../store/ArticleList';
import { Link } from 'react-router';


export class ArticleListPage extends React.Component<void, void>{

    render() {
        const padding = {padding: "8px 8px 8px 8px"};
        return <div>
        <Row type="flex">
            <Col style={padding}  lg={{span: 6, order: 1}} md={{span:6, order: 1}} sm={{span:24, order: 2}} xs={{span:24, order: 2}}>
            <ArticleListSidePanel/>
            </Col>
            <Col style={padding} lg={{span: 18, order: 2}} md={{span:18, order: 2}} sm={{span:24, order: 1}} xs={{span:24, order: 1}} >

            <ArticleList />
            </Col>
        </Row>
        </div>;
    }

}