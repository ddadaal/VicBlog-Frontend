import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { UserState, actionCreators, LoginInfo, UserStatus, UserRole, User } from '../store/User';
import { Link } from 'react-router';
import { Dropdown, Menu, Button, Modal, Icon, notification } from 'antd';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';

type IndicatorProps = UserState & typeof actionCreators;



class NavbarUserIndicator extends React.Component<IndicatorProps, void>{

    constructor(options) {
        super(options);
    }

    handleLogin(loginInfo: LoginInfo) {
        this.props.requestLogin(loginInfo);
    }

    componentDidUpdate() {
        if (this.props.status == UserStatus.TokenOutdated) {
            this.props.logout();
            notification.info({
                description: <p>Your token is now outdated. You need to <a onClick={() => this.props.openLoginModal()}>relogin</a>!</p>,
                message: "Need to relogin",

            });

        }
        if (this.props.status == UserStatus.TokenInvalid) {
            this.props.logout();
            notification.info({
                description: <p>Your token is invalid. You need to <a onClick={() => this.props.openLoginModal()}>relogin</a>!</p>,
                message: "Need to relogin",

            });

        }
    }

    render() {

        if (this.props.status == UserStatus.LoggedIn) {
            const dropdownMenu = <Menu >
                <Menu.Item key="profile">
                    <Link to={`/users/${this.props.user.username}`}>Access profile</Link>
                </Menu.Item>
                {this.props.user.role == UserRole.Admin ? <Menu.Item key="compose">
                    <Link to={"/compose"}>Compose new Article</Link>
                </Menu.Item> : []}
                <Menu.Divider />
                <Menu.Item key="logout">
                    <a onClick={this.props.logout}>Log out</a>
                </Menu.Item>
            </Menu>;

            return <Dropdown overlay={dropdownMenu} trigger={["click"]}>
                <a className="ant-dropdown-link">
                    <Icon type="user" /> Welcome, {this.props.user.username} <Icon type="down" />
                </a></Dropdown>;
        }
        else {


            return <div>
                <Button onClick={this.props.openLoginModal}>Log in</Button>
                <LoginModal />
                <RegisterModal />
            </div>
        }
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    actionCreators
)(NavbarUserIndicator);