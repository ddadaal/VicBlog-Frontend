import * as React from "react";
import { Modal } from "../Modal";
import { inject, observer } from "mobx-react";
import { STORE_UI, STORE_USER } from "../../../constants/stores";
import { UiStore, UserStore } from "../../../stores";
import { action, observable } from "mobx";
import { RegisteringContent } from "./RegisteringContent";
import { RegisteredContent } from "./RegisteredContent";
import { AttentionModal } from "../AttentionModal";
import { LoginResult } from "../../../api/UserService";


interface RegisterModalProps {
  [STORE_USER]?: UserStore;
  [STORE_UI]?: UiStore;
}

@inject(STORE_USER, STORE_UI)
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
  };


  render() {
    const ui = this.props[STORE_UI];
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
