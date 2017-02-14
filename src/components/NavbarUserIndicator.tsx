import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { UserState, actionCreators, UserRole, LoginInfo, Status } from '../store/User';
import { Link } from 'react-router';
import { Dropdown, Menu, Button, Modal, Icon } from 'antd';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

type IndicatorProps = UserState & typeof actionCreators;



class NavbarUserIndicator extends React.Component<IndicatorProps, void>{

    constructor(options) {
        super(options);
    }

    handleLogin(loginInfo: LoginInfo) {
        this.props.requestLogin(loginInfo);
    }

    render() {

        if (this.props.status == Status.LoggedIn ) {
            const dropdownMenu = <Menu >
                <Menu.Item key="profile">
                    <Link to={`/users/${this.props.user.username}`}>Access profile</Link>
                </Menu.Item>
                {this.props.user.role == UserRole.Admin ? <Menu.Item key="1">
                    <Link to={"/compose"}>Compose new Article</Link>
                </Menu.Item> : []}
                <Menu.Divider />
                <Menu.Item key="3">
                    <a onClick={this.props.logout}>Log out</a>
                </Menu.Item>
            </Menu>;

            return <Dropdown overlay={dropdownMenu} trigger={["click"]}>
                <a className="ant-dropdown-link">
                    Welcome, {this.props.user.username} <Icon type="down" />
                </a></Dropdown>;
        }
        else {


            return <div>
                <Button onClick={this.props.openLoginModal}>Log in</Button>
                <LoginModal />
                <RegisterModal/>
            </div>
        }
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    actionCreators
)(NavbarUserIndicator);