import * as React from "react";
import style from '../../style';
import { STORE_LOCALE, STORE_USER } from "../../../constants/stores";
import { LocaleStore, UserStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";
import { ErrorLoginResult, LoginError, LoginErrorType, LoginServerError, LoginState } from "../../../stores/UserStore";
import { LocaleMessage } from "../../../internationalization";

interface LoginModalProps {
  [STORE_USER]?: UserStore,
  [STORE_LOCALE]?: LocaleStore
}

interface AlertPanelProps {
  error: LoginError,
  clearError: () => void
}

export class AlertPanel extends React.Component<AlertPanelProps, any> {

  generateAlertPanel = () => {
    const alertMessage = [] as Array<string | JSX.Element>;
    const {error} = this.props;

    switch (error.type) {
      case LoginErrorType.WrongCredential:
        alertMessage.push(
          <LocaleMessage id={"loginModal.wrongCredential"}/>
        );
        break;
      case LoginErrorType.NetworkError:
        alertMessage.push(
          <LocaleMessage id={"loginModal.networkError"}/>
        );
        break;
      case LoginErrorType.ServerError:
        const trueError = error as LoginServerError;
        alertMessage.push(
          <LocaleMessage id={"loginModal.serverError"}/>
        );
        alertMessage.push(
          <br key={0}/>
        );
        for (const message of trueError.messages) {
          alertMessage.push(<br key={message}/>);
          alertMessage.push(message);
        }
        break;
    }

    return <div className={style("w3-container")}>
      <div className={style("w3-panel", "w3-red", "w3-display-container")}>
      <span onClick={this.props.clearError}
            className={style("w3-button", "w3-red", "w3-large", "w3-display-topright")}>&times;</span>
        <h3>
          <LocaleMessage id={"loginModal.loginFailed"}/>
        </h3>
        <p>{alertMessage}</p>
      </div>
    </div>
  };

  render() {
    return this.props.error ? this.generateAlertPanel() : null;
  }
}

@inject(STORE_USER, STORE_LOCALE)
@observer
export class LoginModal extends React.Component<LoginModalProps, any> {

  @observable username: string = "";
  @observable password: string = "";
  @observable lastError: LoginError = null;

  @action handleUsernameChange = (e) => {
    this.username = e.target.value;
  };

  @action handlePasswordChange = (e) => {
    this.password = e.target.value;
  };

  @action reset = () => {
    this.password = "";
    this.username = "";
  };

  @action clearError = () => {
    this.lastError = null;
  };

  @action login = async () => {
    const user = this.props[STORE_USER];
    this.clearError();
    const loginResult = await user.login(this.username, this.password);
    if (loginResult.success) {
      runInAction("Login successful", () => {
        user.toggleLoginModalShown();
        this.reset();
      });
    } else {
      const error = loginResult as ErrorLoginResult;
      runInAction("Login failed", () => {
        this.lastError = error.error;
      })
    }
  };

  render() {
    const user = this.props[STORE_USER];
    const locale = this.props[STORE_LOCALE];
    const isLoggingIn = user.state === LoginState.LoggingIn;

    return <div className={style("w3-modal")} style={{display: user.loginModalShown ? "block" : "none"}}>
      <div className={style("w3-modal-content", "w3-card-4", "w3-animate-zoom")} style={{maxWidth: "600px"}}>
        <div className={style("w3-container")}>

          <div className={style("w3-center")}>
                    <span onClick={user.toggleLoginModalShown} title={locale.definitions.loginModal.close}
                          className={style("w3-button", "w3-xlarge", "w3-hover-red", "w3-display-topright")}>&times;</span>
            <h1>
              <LocaleMessage id={"loginModal.title"}/>
            </h1>
          </div>
        </div>

        <AlertPanel error={this.lastError} clearError={this.clearError}/>

        <form className={style("w3-container")}>
          <div className={style("w3-section")}>
            <label>
              <b>
                <LocaleMessage id={"loginModal.username"}/>
              </b>
            </label>
            <input className={style("w3-input", "w3-border", "w3-margin-bottom")} type="text" value={this.username}
                   placeholder={locale.definitions.loginModal.pleaseInputUsername}
                   onChange={this.handleUsernameChange} required/>
            <label>
              <b>
                <LocaleMessage id={"loginModal.password"}/>
              </b>
            </label>
            <input className={style("w3-input", "w3-border")} type="password" value={this.password}
                   placeholder={locale.definitions.loginModal.pleaseInputPassword}
                   onChange={this.handlePasswordChange} required/>
          </div>
        </form>

        <div className={style("w3-container", "w3-border-top", "w3-padding-16", "w3-light-grey")}>
          <button onClick={user.toggleLoginModalShown} type="button"
                  className={style("w3-button", "w3-blue", "w3-padding")}>
            <LocaleMessage id={"loginModal.register"}/>
          </button>
          <button onClick={user.toggleLoginModalShown} type="button"
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
        </div>

      </div>
    </div>;
  }
}