import * as React from 'react';
import { actionCreators, RegisterInfo, User } from '../store/User';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Checkbox, Alert, Icon } from 'antd';
import { browserHistory } from 'react-router';
import { APIs, JSONRequestInit, registerTerms, errorMessage } from '../Utils';
const FormItem = Form.Item;
const md = require("markdown-it")();

enum Status {
    Initial,
    Registering,
    Success,
    UsernameExists,
    FormUsernameInvalid,
    FormPasswordInvalid,
    TermsNotAgreed,
    Network,
    Others
}
type RegisterModalProps = typeof actionCreators & { registerModalVisible: boolean };

interface RegisterModalStates {
    username: string,
    password: string
    termsAgreed: boolean,
    status: Status,
    registeredUser: User,
    remember: boolean
}

class RegisterModal extends React.Component<RegisterModalProps, RegisterModalStates>{

    register(info: RegisterInfo) {
        const url = APIs.regsiter;
        return fetch(url, JSONRequestInit(info)).then(res => {
            switch (res.status) {
                case 201:
                    res.json().then(json => this.setState({
                        status: Status.Success,
                        registeredUser: json as User
                    }));
                    break;
                case 409:
                    this.setState({ status: Status.UsernameExists });
                    break;
                default:
                    this.setState({ status: Status.Others });
            }
        }).catch(res => {
            switch (res.status) {
                case 409:
                    this.setState({ status: Status.UsernameExists });
                    break;
                default:
                    this.setState({ status: Status.Network });
            }
        });
    }

    handleSubmit() {
        if (!this.state.username || this.state.username.includes(" ")) {
            this.setState({
                status: Status.FormUsernameInvalid
            });
            return;
        }
        if (!this.state.password) {
            this.setState({
                status: Status.FormPasswordInvalid
            });
            return;
        }
        if (!this.state.termsAgreed) {
            this.setState({
                status: Status.TermsNotAgreed
            });
            return;
        }
        this.register({
            username: this.state.username,
            password: this.state.password
        });
    }

    handleUsernameChange(e) {


        this.setState({
            username: e.target.value
        });
        if (this.state.status == Status.FormUsernameInvalid) {
            this.setState({ status: Status.Initial });
        }
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
        if (this.state.status == Status.FormPasswordInvalid) {
            this.setState({ status: Status.Initial });
        }
    }

    showTerms() {
        Modal.info({
            title: "VicBlog Terms and Conditions",
            content: (
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(registerTerms) }} />
            ),
            width: "600px",
            okText: "OK I knew it."
        });
    }

    reset() {
        this.setState({
            username: "",
            password: "",
            termsAgreed: false,
            status: Status.Initial,
            registeredUser: null,
            remember: false
        })
    }
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            termsAgreed: false,
            status: Status.Initial,
            registeredUser: null,
            remember: false
        }
    }

    render() {
        const widthStyle = { maxWidth: "600px", marginLeft: "auto", marginRight: "auto" };
        let insideComponent = null;
        let footerComponents = null;
        if (this.state.status == Status.Success) {
            insideComponent = <div style={widthStyle}>
                <h1> Welcome! {this.state.registeredUser.username}!</h1>
                You have been successfully registered!
            </div>;
            footerComponents = [
                <Checkbox key="remember" onChange={() => { this.setState({ remember: !this.state.remember }) }} checked={this.state.remember}>Remember me!</Checkbox>,
                <Button key="close" size="large" onClick={() => {
                    this.props.closeRegisterModal();
                    this.reset();
                }}>Close</Button>,
                <Button key="back" type="primary" onClick={() => {
                    this.props.closeRegisterModal();
                    this.props.directLogin(this.state.registeredUser, this.state.remember);
                }}>Click to direct login and Close this modal!</Button>,

            ]
        }
        else {
            let usernameInputStatus = this.state.status == Status.FormUsernameInvalid ? { validateStatus: "error", help: "Invalid username. Username must contain no whitespace." } : {};
            const passwordInputStatus = this.state.status == Status.FormPasswordInvalid ? { validateStatus: "error", help: "Invalid password." } : {};

            let alertMsg = "";
            switch (this.state.status) {
                case Status.Network:
                    alertMsg = errorMessage.Network;
                    break;
                case Status.Others:
                    alertMsg = errorMessage.Others;
                    break;
                case Status.TermsNotAgreed:
                    alertMsg = "You must agree the terms and conditions.";
                    break;
                case Status.UsernameExists:
                    alertMsg = "Username exists! Please change one."
                    break;
                default:
                    alertMsg = "";
            }
            const alert = alertMsg ? <Alert type="error" message={alertMsg} /> : [];


            insideComponent = <div style={widthStyle}>
                {alert}
                <Form>
                    <Form.Item {...usernameInputStatus}>
                        <Input addonBefore={<Icon type="user" />} placeholder="Username" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)} />
                    </Form.Item >
                    <Form.Item {...passwordInputStatus}>
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
                    </Form.Item>
                    <Checkbox onChange={e => this.setState({ termsAgreed: !this.state.termsAgreed })} checked={this.state.termsAgreed} >
                        I have read and agreed the <a onClick={() => this.showTerms()}>VicBlog Terms and Conditions</a>.
                    </Checkbox>

                </Form>
            </div>

            footerComponents = [
                <Button key="return" size="large" onClick={() => {

                    this.props.closeRegisterModal();
                    this.reset();
                }}>Close</Button>,
                <Button key="register" size="large" type="primary" onClick={() => this.handleSubmit()} loading={this.state.status == Status.Registering}>Register</Button>
            ];
        }



        return <Modal footer={footerComponents} onCancel={this.props.closeRegisterModal} title="Register" visible={this.props.registerModalVisible} children={insideComponent} />
    }
}

export default connect(
    (s: ApplicationState) => ({ registerModalVisible: s.user.registerModalVisible }),
    actionCreators
)(RegisterModal);