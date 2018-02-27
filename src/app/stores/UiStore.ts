import { action, observable } from "mobx";

interface LoginPanelFields {
  username: string,
  password: string,
  remember: boolean
}


export class UiStore {
  @observable loginModalShown = false;
  @observable registerModalShown = false;
  @observable temporaryLoginPanelFields: LoginPanelFields = null;

  @observable loginModalLoaded = false;
  @observable registerModalLoaded = false;

  @action saveLoginPanelFields = (fields: LoginPanelFields) => {
    this.temporaryLoginPanelFields = fields;
  };

  @action clearLoginPanelFields = () => {
    this.temporaryLoginPanelFields = null;
  };

  @action toggleLoginModalShown = () => {
    this.loginModalShown = !this.loginModalShown;
  };

  @action toggleRegisterModalShown = () => {
    this.registerModalShown = !this.registerModalShown;
  };

}