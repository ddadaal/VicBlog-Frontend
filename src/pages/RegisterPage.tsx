import * as React from 'react';
import * as Register from '../store/Register';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Form, Button, Icon, Input, Alert, Checkbox, Modal, Collapse } from 'antd';
import { errorMessage, registerTerms } from '../Utils';
import { browserHistory} from 'react-router';
const FormItem = Form.Item;
const md = require("markdown-it")();
const Panel = Collapse.Panel;

type RegisterPageProps = typeof Register.actionCreators & Register.RegisterStatus;

class RegisterPage extends React.Component<RegisterPageProps, void>{
    handleSubmit() {
        if (!this.props.registerInfo.username || this.props.registerInfo.username.includes(" ")) {
            this.props.changeStatus(Register.Status.FormUsernameInvalid);
            return;
        }
        if (!this.props.registerInfo.password) {
            this.props.changeStatus(Register.Status.FormPasswordInvalid);
            return;
        }
        if (!this.props.registerInfo.termsAgreed) {
            this.props.changeStatus(Register.Status.TermsNotAgreed);
            return;
        }
        this.props.register(this.props.registerInfo);
    }

    handleUsernameChange(e) {


        this.props.changeRegisterInfo({
            ...this.props.registerInfo,
            username: e.target.value
        });
        if (this.props.status == Register.Status.FormUsernameInvalid) {
            this.props.changeStatus(Register.Status.Initial);
        }
    }

    handlePasswordChange(e) {

        this.props.changeRegisterInfo({
            ...this.props.registerInfo,
            password: e.target.value
        });
        if (this.props.status == Register.Status.FormPasswordInvalid) {
            this.props.changeStatus(Register.Status.Initial);
        }
    }

    componentWillUnmount() {
        this.props.resetStatus();
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

    render() {
        const widthStyle = { maxWidth: "600px", marginLeft: "auto", marginRight: "auto" };
        if (this.props.status == Register.Status.Success) {
            return <div style={widthStyle}>
                <h1> Welcome! {this.props.registeredUser.username}!</h1>
                You have been successfully registered!
                <hr />
                <Button type="primary" onClick={() => {
                    this.props.directLogin(this.props.registeredUser);
                    browserHistory.push("/");
                    }}>Click to direct login and jump back to homepage!</Button>
            </div>;
        }

        let usernameInputStatus = this.props.status == Register.Status.FormUsernameInvalid ? { validateStatus: "error", help: "Invalid username. Username must contain no whitespace." } : {};
        const passwordInputStatus = this.props.status == Register.Status.FormPasswordInvalid ? { validateStatus: "error", help: "Invalid password." } : {};

        let alertMsg = "";
        switch (this.props.status) {
            case Register.Status.Network:
                alertMsg = errorMessage.Network;
                break;
            case Register.Status.Others:
                alertMsg = errorMessage.Others;
                break;
            case Register.Status.TermsNotAgreed:
                alertMsg = "You must agree the terms and conditions";
                break;
            case Register.Status.UsernameExists:
                alertMsg = "Username exists! Please change one."
                break;
            default:
                alertMsg = "";
        }
        const alert = alertMsg ? <Alert type="error" message={alertMsg} /> : [];


        return <div style={widthStyle}>
            {alert}
            <Form>
                <Form.Item {...usernameInputStatus}>
                    <Input addonBefore={<Icon type="user" />} placeholder="Username" value={this.props.registerInfo.username} onChange={(e) => this.handleUsernameChange(e)} />
                </Form.Item >
                <Form.Item {...passwordInputStatus}>
                    <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" value={this.props.registerInfo.password} onChange={(e) => this.handlePasswordChange(e)} />
                </Form.Item>
                <Checkbox onChange={e => this.props.changeRegisterInfo({ ...this.props.registerInfo, termsAgreed: !this.props.registerInfo.termsAgreed })} checked={this.props.registerInfo.termsAgreed} >
                    I have read and agreed the <a onClick={() => this.showTerms()}>VicBlog Terms and Conditions</a>.
                    </Checkbox>
                <Button type="primary" onClick={() => this.handleSubmit()} loading={this.props.status == Register.Status.Registering}>Register</Button>
            </Form>
        </div>
    }
}


export default connect(
    (s: ApplicationState) => s.registerStatus,
    Register.actionCreators
)(RegisterPage);

