import * as React from 'react';
import { APIs, padding, twoColStyleLeft, twoColStyleRight } from '../Utils';
import { Spin, Menu, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';


interface AboutPageProps {
    currentPath: string
}

class AboutPage extends React.Component<AboutPageProps, void>{

    constructor(props) {
        super(props);
    }

    render() {
        const currentKey = this.props.currentPath.split('/')[2];
        return <Row type="flex" style={{marginTop: "16px"}} gutter={32} >
            <Col {...twoColStyleLeft}>
                <Menu selectedKeys={[currentKey]} mode="vertical">
                    <Menu.Item key="project"><Link to={"/about/project"}>About this project</Link></Menu.Item>
                    <Menu.Item key="me"><Link to={"/about/me"}>About me</Link></Menu.Item>
                </Menu>
            </Col>
            <Col {...twoColStyleRight}>
                {this.props.children}
            </Col>
        </Row>

    }
}

export default connect(
    s => ({ currentPath: s.routing.locationBeforeTransitions.pathname }),
    {}
)(AboutPage);