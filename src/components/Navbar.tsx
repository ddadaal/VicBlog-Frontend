import * as React from 'react';

import { Menu, Icon, Button, Row, Col } from 'antd';
import { Link } from 'react-router';
import Indicator from './NavbarUserIndicator';


export class Navbar extends React.Component<void, void>{
    render() {
        const logo = require("../assets/logo.jpg");
        return (<div>
            <Row style={{ backgroundColor: "white" }}>
                <Col span={6} style={{textAlign: "center"}}>
                    <img  style={{ marginTop: "18px" }} src={logo} alt="VicBlog" />
                </Col>
                <Col span={12}>
                    <Menu style={{ lineHeight: "80px" }} mode="horizontal">
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
                <Col span={6} style={{marginTop: "28px"}}>
                    <Indicator />
                </Col>
            </Row>
        </div>
        );
    }
}

export default Navbar;
