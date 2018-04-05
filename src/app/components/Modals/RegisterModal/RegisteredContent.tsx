import React from "react";
import style from "../../style";
import { ModalBottom } from "../Modal";
import { Checkbox } from "../../Common/Checkbox";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { LocaleMessage } from "../../../internationalization/components";
import { UiStore } from "../../../stores";
import { LoginResult } from "../../../api/UserService";
import { Inject } from "react.di";

interface RegisteredContentProps {
  loginResult: LoginResult;
  login: (remember: boolean) => void;
}

@observer
export class RegisteredContent extends React.Component<RegisteredContentProps, any> {
  @observable rememberMe: boolean = false;
  @Inject uiStore: UiStore;

  @action rememberMeClicked = () => {
    this.rememberMe = !this.rememberMe;
  };

  login = () => {
    this.props.login(this.rememberMe);
    this.closeModals();
  };

  closeModals = () => {
    const ui = this.uiStore;
    ui.toggleRegisterModalShown();
    ui.toggleLoginModalShown();
  };

  render() {
    return <div>
      <div className={style("w3-container")}>
        <div className={style("w3-center")} style={{padding: "10px 10px 10px 10px"}}>
          <LocaleMessage id={"registerModal.complete.content"}
                         replacements={{username: this.props.loginResult.username}}/>
        </div>
      </div>
      <ModalBottom>
        <Checkbox checked={this.rememberMe} onClicked={this.rememberMeClicked}/>
        <span>
          <LocaleMessage id={"loginModal.rememberMe"}/>
        </span>
        <button onClick={this.closeModals} type="button"
                className={style("w3-button", "w3-red", "w3-right", "w3-padding")}>
          <LocaleMessage id={"registerModal.close"}/>
        </button>
        <button onClick={this.login} type="button"
                className={style("w3-button", "w3-blue", "w3-right", "w3-padding")}>
          <LocaleMessage id={"registerModal.complete.clickToLogin"}/>
        </button>
      </ModalBottom>

    </div>
  }
}
