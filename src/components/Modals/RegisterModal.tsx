import * as React from 'react';
import { actionCreators, RegisterInfo, User } from '../../store/User';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Checkbox, Alert, Icon, Spin } from 'antd';
import { APIs, JSONRequestInit, errorMessage } from '../../Utils';
import fetch from 'isomorphic-fetch';
const FormItem = Form.Item;
import { MarkdownDisplay } from '../common';

const enum RegisterStatus {
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
    status: RegisterStatus,
    registeredUser: User,
    remember: boolean,
    termsAndConditionsContent: string,
    termsAndConditionsAcquiring: boolean,
    termsAndConditionsError: boolean
}

class RegisterModal extends React.Component<RegisterModalProps, RegisterModalStates>{

    register(info: RegisterInfo) {
        this.setState({ status: RegisterStatus.Registering });
        const url = APIs.regsiter;
        return fetch(url, JSONRequestInit(info)).then(res => {
            switch (res.status) {
                case 201:
                    res.json().then(json => this.setState({
                        status: RegisterStatus.Success,
                        registeredUser: json as User
                    }));
                    break;
                case 409:
                    this.setState({ status: RegisterStatus.UsernameExists });
                    break;
                default:
                    this.setState({ status: RegisterStatus.Others });
            }
        }).catch(res => {
            switch (res.status) {
                case 409:
                    this.setState({ status: RegisterStatus.UsernameExists });
                    break;
                default:
                    this.setState({ status: RegisterStatus.Network });
            }
        });
    }

    componentDidMount() {
        this.setState({
            termsAndConditionsAcquiring: true
        });
        fetch(APIs.termsAndConditions).then(res => res.text()).then(value => this.setState({
            termsAndConditionsAcquiring: false,
            termsAndConditionsContent: value,
            termsAndConditionsError: false
        })).catch(res => this.setState({
            termsAndConditionsAcquiring: false,
            termsAndConditionsContent: "",
            termsAndConditionsError: true
        }));
    }

    handleSubmit() {
        if (!this.state.username || this.state.username.includes(" ")) {
            this.setState({
                status: RegisterStatus.FormUsernameInvalid
            });
            return;
        }
        if (!this.state.password) {
            this.setState({
                status: RegisterStatus.FormPasswordInvalid
            });
            return;
        }
        if (!this.state.termsAgreed) {
            this.setState({
                status: RegisterStatus.TermsNotAgreed
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
        if (this.state.status == RegisterStatus.FormUsernameInvalid) {
            this.setState({ status: RegisterStatus.Initial });
        }
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
        if (this.state.status == RegisterStatus.FormPasswordInvalid) {
            this.setState({ status: RegisterStatus.Initial });
        }
    }

    showTerms() {
        if (this.state.termsAndConditionsError) {
            this.componentDidMount();
        }
        Modal.info({
            title: "VicBlog Terms and Conditions",
            content: (
                this.state.termsAndConditionsAcquiring
                    ? <div><Spin spinning={true} size="large" />Loading</div>
                    : (this.state.termsAndConditionsError
                        ? <Alert type="error" message={errorMessage.Others} />
                        : <MarkdownDisplay content={this.state.termsAndConditionsContent}/>
                    )
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
            status: RegisterStatus.Initial,
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
            status: RegisterStatus.Initial,
            registeredUser: null,
            remember: false,
            termsAndConditionsAcquiring: false,
            termsAndConditionsContent: "",
            termsAndConditionsError: false
        }
    }

    render() {
        const widthStyle = { maxWidth: "600px", marginLeft: "auto", marginRight: "auto" };
        let insideComponent = null;
        let footerComponents = null;
        if (this.state.status == RegisterStatus.Success) {
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
                }}>Click to login directly and close this modal!</Button>,

            ]
        }
        else {
            let usernameInputStatus = this.state.status == RegisterStatus.FormUsernameInvalid ? { validateStatus: "error", help: "Invalid username. Username must contain no whitespace." } : {};
            const passwordInputStatus = this.state.status == RegisterStatus.FormPasswordInvalid ? { validateStatus: "error", help: "Invalid password." } : {};

            let alertMsg = "";
            switch (this.state.status) {
                case RegisterStatus.Network:
                    alertMsg = errorMessage.Network;
                    break;
                case RegisterStatus.Others:
                    alertMsg = errorMessage.Others;
                    break;
                case RegisterStatus.TermsNotAgreed:
                    alertMsg = "You must agree the terms and conditions.";
                    break;
                case RegisterStatus.UsernameExists:
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
                        <div>
                        I have read and agreed the <a onClick={() => this.showTerms()}>VicBlog Terms and Conditions</a>.
                        </div>
                    </Checkbox>

                </Form>
            </div>

            footerComponents = [
                <Button key="return" size="large" onClick={() => {

                    this.props.closeRegisterModal();
                    this.reset();
                }}>Close</Button>,
                <Button key="register" size="large" type="primary" onClick={() => this.handleSubmit()} loading={this.state.status == RegisterStatus.Registering}>Register</Button>
            ];
        }



        return <Modal footer={footerComponents} onCancel={this.props.closeRegisterModal} title="Register" visible={this.props.registerModalVisible} children={insideComponent} />
    }
}

export default connect(
    (s: ApplicationState) => ({ registerModalVisible: s.user.registerModalVisible }),
    actionCreators
)(RegisterModal);