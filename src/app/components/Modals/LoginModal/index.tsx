import * as React from "react";
import style from '../../style';
import { STORE_LOCALE, STORE_USER } from "../../../constants/stores";
import { LocaleStore, UserStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";
import { LoginError, LoginErrorType, LoginState, ServerError } from "../../../stores/UserStore";

interface LoginModalProps {
  [STORE_USER]?: UserStore,
  [STORE_LOCALE]?: LocaleStore
}

interface AlertPanelProps {
  [STORE_LOCALE]?: LocaleStore,
  [STORE_USER]?: UserStore
}

@inject(STORE_LOCALE, STORE_USER)
@observer
export class AlertPanel extends React.Component<AlertPanelProps, any> {

  generateAlertPanel = () => {
    const alertMessage = [] as Array<string | JSX.Element>;
    const locale = this.props[STORE_LOCALE];
    const user = this.props[STORE_USER];

    switch (user.previousError.type) {
      case LoginErrorType.WrongCredential:
        alertMessage.push(locale.definition.loginModal.wrongCredential);
        break;
      case LoginErrorType.Network:
        alertMessage.push(locale.definition.loginModal.networkError);
        break;
      case LoginErrorType.Server:
        const error = user.previousError as ServerError;
        alertMessage.push(locale.definition.loginModal.serverError);
        alertMessage.push(<br key={0}/>);
        for (const message of error.messages) {
          alertMessage.push(<br key={message}/>);
          alertMessage.push(message);
        }
        break;
    }

    return <div className={style("w3-container")}>
      <div className={style("w3-panel", "w3-red", "w3-display-container")}>
      <span onClick={user.clearError}
            className={style("w3-button", "w3-red", "w3-large", "w3-display-topright")}>&times;</span>
        <h3>{locale.definition.loginModal.loginFailed}</h3>
        <p>{alertMessage}</p>
      </div>
    </div>
  };

  render() {
    return this.props[STORE_USER].previousError ? this.generateAlertPanel() : null;
  }
}

@inject(STORE_USER, STORE_LOCALE)
@observer
export class LoginModal extends React.Component<LoginModalProps, any> {

  @observable username: string = "";
  @observable password: string = "";

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

  @action login = async () => {
    this.props[STORE_USER].clearError();
    await this.props[STORE_USER].login(this.username, this.password);
    if (!this.props[STORE_USER].previousError) {
      runInAction("Login successful", () => {
        this.props[STORE_USER].toggleLoginModalShown();
        this.reset();
      });
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
                    <span onClick={user.toggleLoginModalShown} title={locale.definition.loginModal.close}
                          className={style("w3-button", "w3-xlarge", "w3-hover-red", "w3-display-topright")}>&times;</span>
            <h1>{locale.definition.loginModal.title}</h1>
          </div>
        </div>

        <AlertPanel />

        <form className={style("w3-container")}>
          <div className={style("w3-section")}>
            <label><b>{locale.definition.loginModal.username}</b></label>
            <input className={style("w3-input", "w3-border", "w3-margin-bottom")} type="text" value={this.username}
                   placeholder={locale.definition.loginModal.pleaseInputUsername}
                   onChange={this.handleUsernameChange} required/>
            <label><b>{locale.definition.loginModal.password}</b></label>
            <input className={style("w3-input", "w3-border")} type="password" value={this.password}
                   placeholder={locale.definition.loginModal.pleaseInputPassword}
                   onChange={this.handlePasswordChange} required/>
          </div>
        </form>

        <div className={style("w3-container", "w3-border-top", "w3-padding-16", "w3-light-grey")}>
          <button onClick={user.toggleLoginModalShown} type="button"
                  className={style("w3-button", "w3-blue", "w3-padding")}>{locale.definition.loginModal.register}</button>
          <button onClick={user.toggleLoginModalShown} type="button"
                  className={style("w3-button", "w3-red", "w3-right", "w3-padding")}>{locale.definition.loginModal.close}</button>
          <button onClick={this.login} type="button" disabled={isLoggingIn}
                  className={style("w3-button", "w3-blue", "w3-right", "w3-padding")}>
            {isLoggingIn ? locale.definition.loginModal.loggingIn : locale.definition.loginModal.login}</button>
        </div>

      </div>
    </div>;
  }
}