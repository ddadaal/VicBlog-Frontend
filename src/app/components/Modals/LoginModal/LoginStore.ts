import { action, observable, runInAction } from "mobx";
import { LoginResult, UserService } from "../../../api/UserService";
import { Inject, Injectable } from "react.di";


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


@Injectable
export class LoginStore {

  constructor(@Inject private userService: UserService) {

  }

  @observable state: LoginState = LoginState.NotLoggedIn;

  @action public logout = () => {
    this.state = LoginState.NotLoggedIn;
  };


  @action public requestLogin = async (username: string, password: string): Promise<LoginResult> => {
    this.state = LoginState.LoggingIn;

    const res = await this.userService.login(username, password);

    const {statusCode, response, error, ok} = res;

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
    } else if (error.isNetworkError) {
      throw {type: LoginErrorType.NetworkError, error: error.info};
    } else {
      throw {type: LoginErrorType.ServerError, messages: response.errorDescriptions} as LoginServerError;
    }
  }
}
