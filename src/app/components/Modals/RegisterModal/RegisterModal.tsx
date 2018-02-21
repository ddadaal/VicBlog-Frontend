import * as React from "react";
import { Modal } from "../Modal";
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../../constants/stores";
import { UserStore } from "../../../stores";
import { action, observable } from "mobx";
import { RegisteringContent } from "./RegisteringContent";
import { RegisteredContent } from "./RegisteredContent";
import { AttentionModal } from "./AttentionModal";
import { LoginResult } from "../../../stores/UserStore";


interface RegisterModalProps {
  [STORE_USER]?: UserStore
}

@inject(STORE_USER)
@observer
export class RegisterModal extends React.Component<RegisterModalProps, any> {

  @observable loginResult: LoginResult = null;
  @observable termsModalShown: boolean = false;

  @action toggleTermsModalShown = () => {
    this.termsModalShown = !this.termsModalShown;
  };

  @action onRegisterSucceeded = (res) => {
    this.loginResult = res;
  };

  @action login = (remember: boolean) => {
    const user = this.props[STORE_USER];
    user.login(this.loginResult);
    if (remember) {
      user.remember();
    }
    this.closeRegisteredContent();
  };

  @action closeRegisteredContent = () => {
    const user = this.props[STORE_USER];
    user.toggleRegisterModalShown();
  };

  render() {
    const user = this.props[STORE_USER];
    const registered = this.loginResult != null;

    return <div>

      <Modal titleId={registered ? "registerModal.complete.congrats" : "registerModal.title"}
             toggleShown={user.toggleRegisterModalShown}>

        {registered
          ? <RegisteredContent toggleModalShown={this.closeRegisteredContent}
                               loginResult={this.loginResult}
                               login={this.login}/>
          : <RegisteringContent onRegisterSuccess={this.onRegisterSucceeded}
                                toggleModalShown={user.toggleRegisterModalShown}
                                toggleTermsModalShown={this.toggleTermsModalShown}
          />

        }
      </Modal>
      {this.termsModalShown ? <AttentionModal toggleModalShown={this.toggleTermsModalShown}/> : null}
    </div>
  }
}