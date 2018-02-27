import { STORE_UI } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { AsyncComponent } from "../../routes/AsyncComponent";
import { Modal } from "../Modals/Modal";
import style from '../style';
import { LocaleMessage } from "../Common/Locale";

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

@inject(STORE_UI)
@observer
export class NavbarModals extends React.Component<any, any> {

  loadLoginModal = async () => {
    const Modal = (await import("../Modals/LoginModal")).LoginModal;
    return <Modal/>;
  };

  loadRegisterModal = async () => {
    const Modal = (await import("../Modals/RegisterModal")).RegisterModal;
    return <Modal/>;
  };


  render() {
    const ui = this.props[STORE_UI];
    return <div>
      {ui.loginModalShown ? <AsyncComponent render={this.loadLoginModal} componentWhenLoading={<LoadingModal/>} /> : null}
      {ui.registerModalShown ? <AsyncComponent render={this.loadRegisterModal} componentWhenLoading={<LoadingModal/>}/>: null}
    </div>;
  }
}

