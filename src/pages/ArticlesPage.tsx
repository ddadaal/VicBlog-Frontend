import * as React from 'react';
import ArticleListSidePanel from '../components/ArticleListSidePanel';
import ArticleList from '../components/ArticleList';
import { Row ,Col } from 'antd';
import {connect} from 'react-redux';
import * as Store from '../store/ArticleList';

type ArticlesPageProps = Store.ArticleListState;

export class ArticlesPage extends React.Component<ArticlesPageProps, void>{

    render() {
        return <div>
        <Row>
            <Col span={6}>
            <ArticleListSidePanel/>
            </Col>
            <Col span={18}>
            <ArticleList />
            </Col>
        </Row>
        </div>;
    }

}