import { observer } from "mobx-react";
import React from "react";
import { AsyncComponent } from "../../routes/AsyncComponent";
import { Modal } from "../Modals/Modal";
import style from '../style';
import { LocaleMessage } from "../../internationalization/components";
import { UiStore } from "../../stores";
import { Inject } from "react.di";

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
}

@observer
export class NavbarModals extends React.Component<NavbarModalsProps, any> {

  @Inject uiStore: UiStore;

  loadLoginModal = async () => {
    this.uiStore.startLoadingLoginModal();
    const Modal = (await import("../Modals/LoginModal")).LoginModal;
    this.uiStore.finishedLoadingLoginModal();
    return <Modal/>;
  };

  loadRegisterModal = async () => {
    this.uiStore.startLoadingRegisterModal();
    const Modal = (await import("../Modals/RegisterModal")).RegisterModal;
    this.uiStore.finishedLoadingRegisterModal();
    return <Modal/>;
  };

  render() {
    return <div>
      {this.uiStore.loginModalShown
        ? <AsyncComponent render={this.loadLoginModal}/>
        : null}
      {this.uiStore.registerModalShown
        ? <AsyncComponent render={this.loadRegisterModal}/>
        : null}
    </div>;
  }
}

