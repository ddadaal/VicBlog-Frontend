import * as React from 'react';
import style from "../../style";
import { ModalBottom } from "../Modal";
import { Checkbox } from "../../Common/Checkbox";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import { LocaleMessage } from "../../../internationalization/components";
import { STORE_UI } from "../../../constants/stores";
import { UiStore } from "../../../stores";
import { LoginResult } from "../../../api/UserService";

interface RegisteredContentProps {
  loginResult: LoginResult;
  login: (remember: boolean) => void;
  [STORE_UI]?: UiStore
}

@inject(STORE_UI)
@observer
export class RegisteredContent extends React.Component<RegisteredContentProps, any> {
  @observable rememberMe: boolean = false;

  @action rememberMeClicked = () => {
    this.rememberMe = !this.rememberMe;
  };

  login = () => {
    this.props.login(this.rememberMe);
    this.closeModals();
  };

  closeModals = () => {
    const ui = this.props[STORE_UI];
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
