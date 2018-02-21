import { STORE_USER } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import { UserStore } from "../../stores";
import * as React from "react";
import { LoginModal } from "../Modals/LoginModal";
import { RegisterModal } from "../Modals/RegisterModal";


@inject(STORE_USER)
@observer
class ObserverLoginModal extends React.Component<{},{}> {
  render() {
    const user = this.props[STORE_USER];
    return user.loginModalShown ? <LoginModal/> : null;
  }
}

@inject(STORE_USER)
@observer
class ObserverRegisterModal extends React.Component<{},{}> {
  render() {
    const user = this.props[STORE_USER];
    return user.registerModalShown ? <RegisterModal/> : null;
  }
}


export class NavbarModals extends React.Component<any, any> {
  render() {
    return <div>
      <ObserverLoginModal/>
      <ObserverRegisterModal/>
    </div>;
  }
}

