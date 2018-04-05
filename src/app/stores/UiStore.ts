import { action, observable } from "mobx";
import { Injectable } from "react.di";

interface LoginPanelFields {
  username: string,
  password: string,
  remember: boolean
}

@Injectable
export class UiStore {
  @observable loginModalShown = false;
  @observable registerModalShown = false;
  @observable temporaryLoginPanelFields: LoginPanelFields = null;

  @observable loginModalLoading = false;
  @observable registerModalLoading = false;

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

  @action startLoadingLoginModal = () => {
    this.loginModalLoading = true;
  };


  @action finishedLoadingLoginModal = () => {
    this.loginModalLoading = false;
  };


  @action startLoadingRegisterModal = () => {
    this.registerModalLoading = true;
  };


  @action finishedLoadingRegisterModal = () => {
    this.registerModalLoading = false;
  }

}
