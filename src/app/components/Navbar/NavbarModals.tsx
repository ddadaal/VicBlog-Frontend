import { STORE_UI } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { AsyncComponent } from "../../routes/AsyncComponent";
import { Modal } from "../Modals/Modal";
import style from '../style';
import { LocaleMessage } from "../Common/Locale";
import { UiStore } from "../../stores";

export class LoadingModal extends React.Component<{},{}> {

  render() {
    return <Modal>
      <div className={style("w3-container","w3-display-container")} style={{minHeight: "200px"}}>
        <div className={style("w3-display-middle")} >
          <h2><LocaleMessage id={"loginModal.loading"}/></h2>
        </div>
      </div>
    </Modal>
  }
}

interface NavbarModalsProps {
  [STORE_UI]?: UiStore
}

@inject(STORE_UI)
@observer
export class NavbarModals extends React.Component<NavbarModalsProps, any> {

  loadLoginModal = async () => {
    const ui = this.props[STORE_UI];
    ui.startLoadingLoginModal();
    const Modal = (await import("../Modals/LoginModal")).LoginModal;
    ui.finishedLoadingLoginModal();
    return <Modal/>;
  };

  loadRegisterModal = async () => {
    const ui = this.props[STORE_UI];
    ui.startLoadingRegisterModal();
    const Modal = (await import("../Modals/RegisterModal")).RegisterModal;
    ui.finishedLoadingRegisterModal();
    return <Modal/>;
  };

  render() {
    const ui = this.props[STORE_UI];
    return <div>
      {ui.loginModalShown
        ? <AsyncComponent render={this.loadLoginModal}/>
        : null}
      {ui.registerModalShown
        ? <AsyncComponent render={this.loadRegisterModal}/>
        : null}
    </div>;
  }
}

