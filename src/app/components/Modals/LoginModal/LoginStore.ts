import { APIs } from "../../../api/ApiDefinition";
import { encryptPassword, LoginResult } from "../../../stores/UserStore";
import { action, observable, runInAction } from "mobx";
import { NetworkStore } from "../../../stores/NetworkStore";


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
    const getUrl = NetworkStore.appendQueryString(APIs.login, {username, password});

    const res = await NetworkStore.fetch(getUrl);

    const {statusCode, response, error,ok, isNetworkError} = res;

    if (ok) {
      return runInAction("requestLogin success", () => {
        this.state = LoginState.LoggedIn;
        return response;
      });
    }
    runInAction("requestLogin failed", async () => {
      this.state = LoginState.NotLoggedIn;
    });
    if (statusCode === 401) {
      throw {type: LoginErrorType.WrongCredential};
    } else if (isNetworkError) {
      throw {type: LoginErrorType.NetworkError, error: error};
    } else {
      throw {type: LoginErrorType.ServerError, messages: response.errorDescriptions} as LoginServerError;
    }
  }
}