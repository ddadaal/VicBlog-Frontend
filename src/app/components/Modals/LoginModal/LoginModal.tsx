import * as React from "react";
import style from '../../style';
import { STORE_UI, STORE_USER } from "../../../constants/stores";
import { UiStore, UserStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import { action, computed, observable, runInAction } from "mobx";
import { FormInput } from "../FormInput";
import { Modal, ModalBottom } from "../Modal";
import { LoginAlertPanel } from "./LoginAlertPanel";
import { LoginError, LoginState, LoginStore } from "./LoginStore";
import { Checkbox } from "../../Common/Checkbox";
import { LocaleMessage } from "../../Common/Locale";
import { Spin } from "../../Common/Spin";

interface LoginModalProps {
  [STORE_USER]?: UserStore,
  [STORE_UI]?: UiStore
}

@inject(STORE_USER, STORE_UI)
@observer
export class LoginModal extends React.Component<LoginModalProps, any> {

  @observable username: string = "";
  @observable password: string = "";
  @observable loginAttempted: boolean = false;
  @observable rememberMe: boolean = false;
  loggedIn: boolean = false;
  @observable lastError: LoginError = null;

  @observable loginStore: LoginStore = new LoginStore();

  @action rememberMeClicked = () => {
    this.rememberMe = !this.rememberMe;
  };

  @computed get usernameValid() {
    return !this.loginAttempted || this.username !== "";
  }

  @computed get passwordValid() {
    return !this.loginAttempted || this.password !== "";
  }

  @action handleUsernameChange = (e) => {
    this.username = e.target.value;
  };

  @action handlePasswordChange = (e) => {
    this.password = e.target.value;
  };


  @action validate = () => {
    return this.usernameValid && this.passwordValid;
  };

  @action clearError = () => {
    this.lastError = null;
  };

  @action login = async () => {
    this.loginAttempted = true;
    if (!this.validate()) {
      return;
    }
    const user = this.props[STORE_USER];
    this.clearError();
    try {
      const loginResult = await this.loginStore.requestLogin(this.username, this.password);
      runInAction("Login successful", () => {
        this.loggedIn = true;
        user.login(loginResult);
        if (this.rememberMe) {
          user.remember();
        }
        this.props[STORE_UI].toggleLoginModalShown();
      });
    } catch (e) {
      console.log(e);
      runInAction("Login failed", () => {
        this.lastError = e;
      })
    }
  };

  @action openRegisterModal = () => {
    const ui = this.props[STORE_UI];
    ui.toggleRegisterModalShown();
  };

  componentWillUnmount() {
    const ui = this.props[STORE_UI];
    if (!this.loggedIn) {
      ui.saveLoginPanelFields({
        username: this.username,
        password: this.password,
        remember: this.rememberMe
      });
    } else {
      ui.clearLoginPanelFields();
    }
  }

  componentDidMount() {
    const ui = this.props[STORE_UI];
    const fields = ui.temporaryLoginPanelFields;
    if (fields) {
      runInAction("Initialize fields", () => {
        this.username = fields.username;
        this.password = fields.password;
        this.rememberMe = fields.remember;
      });
    }
  }

  render() {
    const user = this.props[STORE_USER];
    const ui = this.props[STORE_UI];
    const isLoggingIn = this.loginStore.state === LoginState.LoggingIn;

    return <Modal titleId={"loginModal.title"}
                  toggleShown={ui.toggleLoginModalShown}
    >

      <LoginAlertPanel error={this.lastError} clearError={this.clearError}/>

      <form className={style("w3-container")}>
        <div className={style("w3-section")}>
          <FormInput className={style("w3-input", "w3-border", "w3-margin-bottom")}
                       type={"text"}
                       placeholderTextId={"loginModal.pleaseInputUsername"}
                       labelTextId={"loginModal.username"}
                       invalid={!this.usernameValid}
                       invalidPromptId={"loginModal.pleaseInputUsername"}
                       onChange={this.handleUsernameChange}
                       value={this.username}
          />
          <FormInput className={style("w3-input", "w3-border")}
                       type={"password"}
                       placeholderTextId={"loginModal.pleaseInputPassword"}
                       labelTextId={"loginModal.password"}
                       invalid={!this.passwordValid}
                       invalidPromptId={"loginModal.pleaseInputPassword"}
                       onChange={this.handlePasswordChange}
                       value={this.password}
          />
          <p>
            <Checkbox checked={this.rememberMe} onClicked={this.rememberMeClicked}/>
            <span>
              <LocaleMessage id={"loginModal.rememberMe"}/>
            </span>
          </p>
        </div>
      </form>

      <ModalBottom>
        <button onClick={this.openRegisterModal} type="button"
                className={style("w3-button", "w3-blue", "w3-padding")}>
          <LocaleMessage id={"loginModal.register"}/>
          { ui.registerModalLoading ? <Spin/> : null}
        </button>
        <button onClick={ui.toggleLoginModalShown} type="button"
                className={style("w3-button", "w3-red", "w3-right", "w3-padding")}>
          <LocaleMessage id={"loginModal.close"}/>
        </button>

        <button onClick={this.login} type="button" disabled={isLoggingIn}
                className={style("w3-button", "w3-blue", "w3-right", "w3-padding")}>
          {isLoggingIn
            ? <LocaleMessage id={"loginModal.loggingIn"}/>
            : <LocaleMessage id={"loginModal.login"}/>
          }
        </button>
      </ModalBottom>
    </Modal>;
  }
}