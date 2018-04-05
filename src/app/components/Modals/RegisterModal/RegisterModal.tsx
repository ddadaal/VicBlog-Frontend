import React from "react";
import { Modal } from "../Modal";
import { observer } from "mobx-react";
import { UiStore, UserStore } from "../../../stores";
import { action, observable } from "mobx";
import { RegisteringContent } from "./RegisteringContent";
import { RegisteredContent } from "./RegisteredContent";
import { AttentionModal } from "../AttentionModal";
import { LoginResult } from "../../../api/UserService";
import { Inject } from "react.di";


interface RegisterModalProps {
}

@observer
export class RegisterModal extends React.Component<RegisterModalProps, any> {

  @Inject uiStore: UiStore;
  @Inject userStore: UserStore;
  
  @observable loginResult: LoginResult = null;
  @observable termsModalShown: boolean = false;

  @action toggleTermsModalShown = () => {
    this.termsModalShown = !this.termsModalShown;
  };

  @action onRegisterSucceeded = (res) => {
    this.loginResult = res;
  };

  @action login = (remember: boolean) => {
    const user = this.userStore;
    user.login(this.loginResult);
    if (remember) {
      user.remember();
    }
  };


  render() {
    const ui = this.uiStore;
    const registered = this.loginResult != null;

    return <div>

      <Modal titleId={registered ? "registerModal.complete.congrats" : "registerModal.title"}
             toggleShown={ui.toggleRegisterModalShown}>

        {registered
          ? <RegisteredContent loginResult={this.loginResult}
                               login={this.login}/>
          : <RegisteringContent onRegisterSuccess={this.onRegisterSucceeded}
                                toggleTermsModalShown={this.toggleTermsModalShown}
          />

        }
      </Modal>
      {this.termsModalShown ? <AttentionModal toggleModalShown={this.toggleTermsModalShown}/> : null}
    </div>
  }
}
