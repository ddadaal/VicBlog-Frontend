import * as React from 'react';
import { Menu, Icon, Button, Row, Col } from 'antd';
import { Link } from 'react-router';
import Indicator from './NavbarUserIndicator';
import { connect } from 'react-redux';

type NavbarProps = {
    currentPath: string
};

interface NavbarStates {
    open: boolean
}

export class Navbar extends React.Component<NavbarProps, NavbarStates>{

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        const logo = require("../assets/logo.jpg");
        const selectedKey = this.props.currentPath === '/' ? "home" : this.props.currentPath.split('/')[1];
        return (<div>
            <Row style={{ backgroundColor: "white" }} gutter={16}>
                <Col span={6} style={{ textAlign: "right" }}>
                            <img style={{ marginTop: "18px" }} src={logo} alt="VicBlog" />
                </Col>
                <Col span={12}>
                    <Menu style={{ lineHeight: "80px" }} mode="horizontal" selectedKeys={[selectedKey]}>
                        <Menu.Item key="home">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="articles">
                            <Link to="/articles">Articles</Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to="/about">About</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={6} style={{ marginTop: "28px" }}>
                    <Indicator />
                </Col>
            </Row>
        </div>
        );
    }

    toggleOpen() {
        this.setState({
            open: !this.state.open
        });
    }
}

export default connect(
    s => ({ currentPath: s.routing.locationBeforeTransitions.pathname }),
    {}
)(Navbar);
