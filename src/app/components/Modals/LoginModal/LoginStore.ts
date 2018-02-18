import * as queryString from "querystring";
import { APIs } from "../../../api/ApiDefinition";
import { encryptPassword, LoginResult } from "../../../stores/UserStore";
import { action, observable, runInAction } from "mobx";


export enum LoginState {
  NotLoggedIn,
  LoggingIn,
  LoggedIn
}


export enum LoginErrorType {
  WrongCredential, ServerError, NetworkError
}

export interface LoginError {
  type: LoginErrorType
}

export interface LoginServerError extends LoginError {
  type: LoginErrorType.ServerError,
  messages: string[]
}

export interface LoginNetworkError extends LoginError {
  type: LoginErrorType.NetworkError;
  error: any
}

export class LoginStore {
  @observable state: LoginState;

  @action public logout = () => {
    this.state = LoginState.NotLoggedIn;
  };

  constructor() {
    this.state = LoginState.NotLoggedIn;
  }


  @action public requestLogin = async (username: string, password: string): Promise<LoginResult> => {
    this.state = LoginState.LoggingIn;
    password = encryptPassword(password);
    const getUrl = APIs.login + '?' + queryString.stringify({username, password});
    let error: LoginError = null;
    try {
      const res = await fetch(getUrl);
      const response = await res.json();
      if (res.ok) {
        return runInAction("requestLogin success", () => {
          this.state = LoginState.LoggedIn;
          return response;
        });
      } else {
        runInAction("requestLogin failed", async () => {
          this.state = LoginState.NotLoggedIn;
        });
        if (res.status === 401) {
          error = {type: LoginErrorType.WrongCredential};
        } else {
          error = {type: LoginErrorType.ServerError, messages: response.errorDescriptions} as LoginServerError;
        }
      }

    } catch (e) {
      runInAction("requestLogin failed", () => {
        this.state = LoginState.NotLoggedIn;
      });
      error = {type: LoginErrorType.NetworkError, error: e} as LoginNetworkError;
    }

    throw error;
  }
}