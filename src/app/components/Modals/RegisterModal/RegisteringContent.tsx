import { RegisterError, RegisterState, RegisterStore, } from "./RegisterStore";
import style from "../../style";
import React from "react";
import { observer } from "mobx-react";
import { action, computed, observable, runInAction } from "mobx";
import { RegisterAlertPanel } from "./RegisterAlertPanel";
import { FormInput } from "../FormInput";
import { LocaleMessage } from "../../../internationalization/components";
import { UiStore } from "../../../stores";
import { LoginResult } from "../../../api/UserService";
import { ModalBottom } from "../Modal";
import { Inject, Module } from "react.di";

export interface RegisteringContentProps {
  onRegisterSuccess: (result: LoginResult) => void;
  toggleTermsModalShown: () => void;
}

@Module({
  providers: [
    {provide: RegisterStore, useClass: RegisterStore, noSingleton: true}
  ]
})
@observer
export class RegisteringContent extends React.Component<RegisteringContentProps, any> {
  
  @Inject uiStore: UiStore;
  @Inject store: RegisterStore;

  @observable lastError: RegisterError = null;

  @observable username: string = "";
  @observable password: string = "";
  @observable registerAttempted: boolean = false;

  @computed get usernameValid() {
    return !this.registerAttempted || this.username !== "";
  }

  @computed get passwordValid() {
    return !this.registerAttempted || this.password !== "";
  }

  @action handleUsernameChange = (e) => {
    this.username = e.target.value;
  };

  @action handlePasswordChange = (e) => {
    this.password = e.target.value;
  };


  @action clearError = () => {
    this.lastError = null;
  };


  validate = () => {
    return this.usernameValid && this.passwordValid;
  };

  @action reset = () => {
    this.username = "";
    this.password = "";
    this.registerAttempted = false;
    this.store.reset();
  };

  @action register = async () => {
    this.registerAttempted = true;
    if (!this.validate()) {
      return;
    }
    this.clearError();
    try {
      const result = await this.store.requestRegister(this.username, this.password);
      runInAction("Register successful", () => {
        this.reset();
        this.props.onRegisterSuccess(result);
      });
    } catch (e) {
      console.log(e);
      runInAction("Register failed", () => {
        this.lastError = e;
      });
    }
  };

  render() {
    const isRegistering = this.store.state === RegisterState.Registering;
    const ui = this.uiStore;
    return <div>
      <RegisterAlertPanel error={this.lastError} clearError={this.clearError}/>

      <form className={style("w3-container")}>
        <div className={style("w3-section")}>
          <FormInput className={style("w3-input", "w3-border", "w3-margin-bottom")}
                       type={"text"}
                       placeholderTextId={"registerModal.pleaseInputUsername"}
                       labelTextId={"registerModal.username"}
                       invalid={!this.usernameValid}
                       invalidPromptId={"registerModal.pleaseInputUsername"}
                       onChange={this.handleUsernameChange}
                       value={this.username}
          />

          <FormInput className={style("w3-input", "w3-border")}
                       type={"password"}
                       placeholderTextId={"registerModal.pleaseInputPassword"}
                       labelTextId={"registerModal.password"}
                       invalid={!this.passwordValid}
                       invalidPromptId={"registerModal.pleaseInputPassword"}
                       onChange={this.handlePasswordChange}
                       value={this.password}
          />
        </div>
      </form>

      <ModalBottom>
        <button className={style("w3-button", "w3-padding")} onClick={this.props.toggleTermsModalShown}>
          <LocaleMessage id={"registerModal.registerAttention.link"}/>
        </button>
        <button onClick={ui.toggleRegisterModalShown} type="button"
                className={style("w3-button", "w3-red", "w3-right", "w3-padding")}>
          <LocaleMessage id={"registerModal.close"}/>
        </button>
        <button onClick={this.register} type="button" disabled={isRegistering}
                className={style("w3-button", "w3-blue", "w3-right", "w3-padding")}>
          {isRegistering
            ? <LocaleMessage id={"registerModal.registering"}/>
            : <LocaleMessage id={"registerModal.register"}/>
          }
        </button>
      </ModalBottom>

    </div>
  }
}
