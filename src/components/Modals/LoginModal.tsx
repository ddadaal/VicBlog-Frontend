import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { UserState, actionCreators, LoginInfo, UserStatus } from '../../store/User';
import { Link } from 'react-router';
import { Dropdown, Menu, Button, Modal, Form, Input, Icon, Alert, Checkbox } from 'antd';
import md5 from 'md5';
import { errorMessage } from '../../Utils';

type LoginModalProps = UserState & typeof actionCreators;
interface LoginModalStates {
    username: string,
    password: string,
    remember: boolean,
}

class LoginModal extends React.Component<LoginModalProps, LoginModalStates>{
    constructor(options) {
        super(options);
        this.state = {
            username: "",
            password: "",
            remember: false
        };
    }
    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
        if (this.props.status == UserStatus.FormUsernameInvalid) {
            this.props.setStatus(UserStatus.Initial);
        }
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
        if (this.props.status == UserStatus.FormPasswordInvalid) {
            this.props.setStatus(UserStatus.Initial);
        }

    }
    handleRememberToggle(e) {
        this.setState({
            remember: !e.target.value
        });
    }

    handleLogin() {
        if (!this.state.username) {
            this.props.setStatus(UserStatus.FormUsernameInvalid);
            return;
        }
        if (!this.state.password) {
            this.props.setStatus(UserStatus.FormPasswordInvalid);
            return;
        }
        let info = {
            username: this.state.username,
            password: md5(this.state.password).toUpperCase(),
            remember: this.state.remember
        };
        this.props.requestLogin(info);
    }

    render() {
        let alertMessage = "";

        switch (this.props.status) {
            case UserStatus.CredentialInvalid:
                alertMessage = "Credentials are invalid. Please check.";
                break;
            case UserStatus.Others:
                alertMessage = errorMessage.Others;
                break;
            case UserStatus.Network:
                alertMessage = errorMessage.Network;
                break;
            default:
                alertMessage = "";
        }

        const alert = alertMessage ? <Alert message={alertMessage} type="error" /> : [];

        const usernameInputProps = this.props.status == UserStatus.FormUsernameInvalid ? { validateStatus: "error", help: "Please input username!" } : {};
        const passwordInputProps = this.props.status == UserStatus.FormPasswordInvalid ? { validateStatus: "error", help: "Please input password!" } : {};

        return <Modal title="Log In" visible={this.props.loginModalVisible}
            onCancel={this.props.closeLoginModal}
            footer={[
                <Button key="return" size="large" onClick={() => this.props.closeLoginModal()}>Close</Button>,
                <Button key="register" size="large" onClick={() => {
                    this.props.closeLoginModal();
                    this.props.openRegisterModal();
                }}>Register</Button>,
                <Button key="login" size="large" type="primary" loading={this.props.status == UserStatus.LoggingIn} onClick={() => this.handleLogin()}>Login</Button>
            ]}>
            {alert}
            <Form>
                <Form.Item {...usernameInputProps}>
                    <Input addonBefore={<Icon type="user" />} placeholder="Username" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)} />
                </Form.Item>
                <Form.Item {...passwordInputProps}>
                    <Input addonBefore={<Icon type="lock" />}
                        type="password" placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => this.handlePasswordChange(e)}
                        onPressEnter={()=>this.handleLogin()} />
                </Form.Item>
                <Checkbox onChange={(e) => this.handleRememberToggle(e)}>Remember me!</Checkbox>
            </Form>
        </Modal>
    }
}

export default connect(
    (s: ApplicationState) => s.user,
    actionCreators
)(LoginModal);