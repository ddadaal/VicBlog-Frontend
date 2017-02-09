import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { UserState, actionCreators, UserRole, LoginInfo, LoginError } from '../store/User';
import { Link } from 'react-router';
import { Dropdown, Menu, Button, Modal, Form, Input, Icon, Alert, Checkbox } from 'antd';
import md5 from 'md5';

type LoginModalProps = UserState & typeof actionCreators;
interface LoginModalStates {
    username: string,
    password: string,
    remember: boolean
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
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleRememberToggle(e){
        this.setState({
            remember: !e.target.value
        });
    }

    handleLogin() {
        let info = {
            username: this.state.username,
            password: md5(this.state.password).toUpperCase(),
            remember: this.state.remember
        };
        this.props.requestLogin(info);
    }

    render() {
        let alertMessage = "";

        switch(this.props.errorInfo){
            case LoginError.Forbid:
                alertMessage = "Credentials are invalid. Please check.";
                break;
            case LoginError.Others:
                alertMessage = "Internal Error. Please wait for a fix.";
                break;
            case LoginError.Network:
                alertMessage = "Network error. Please check your network connection and try again.";
                break;
            default:
                alertMessage = "";
        }

        const alert  = alertMessage ? <Alert message={alertMessage} type="error"/> : [];
        

        return <Modal title="Log In" visible={this.props.loginModalVisible}
            onOk={() => this.handleLogin()}
            confirmLoading={this.props.isLoggingIn}
            onCancel={this.props.closeLoginModal}>
            {alert}
            <Input addonBefore={<Icon type="user" />} placeholder="Username" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)} />
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
            <Checkbox onChange={(e)=>this.handleRememberToggle(e)}>Remember me!</Checkbox>
        </Modal>
    }
}

export default connect(
    (s: ApplicationState) => s.user,
    actionCreators
)(LoginModal);