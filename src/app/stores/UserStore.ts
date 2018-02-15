import { action, computed, observable, runInAction } from "mobx";
import { User, UserRole } from "../models/User";
import * as queryString from "querystring";
import md5 from 'md5';
import { APIs } from "./ApiDefinition";


export enum LoginErrorType {
  WrongCredential, ServerError, NetworkError
}

export interface LoginResult {
  success: boolean,
}

export interface ErrorLoginResult extends LoginResult {
  success: false,
  error: LoginError
}

export interface LoginError  {
  type: LoginErrorType
}

export interface LoginServerError extends LoginError {
  type: LoginErrorType.ServerError,
  messages: string[]
}

export enum LoginState {
  NotLoggedIn,
  LoggingIn,
  LoggedIn
}

export class UserStore {
  @observable public user: User = null;
  @observable public state: LoginState = LoginState.NotLoggedIn;
  @observable public loginModalShown: boolean = false;
  @observable public registerModalShown: boolean = false;

  @computed
  public get loggedIn() {
    return this.user && this.state === LoginState.LoggedIn;
  }

  @computed
  public get isAdmin() {
    return this.user && this.user.role === UserRole.Admin;
  }

  @action public logout = () => {
    this.state = LoginState.NotLoggedIn;
    this.user = null;
  };

  @action public toggleLoginModalShown = () => {
    this.loginModalShown = !this.loginModalShown;
  };

  @action public toggleRegisterModalShown = () => {
    this.registerModalShown = !this.registerModalShown;
  };

  private encryptPassword(password: string) {
    return password;
    // return md5(password).toUpperCase();
  }

  @action public login = async (username: string, password: string): Promise<LoginResult> => {
    this.state = LoginState.LoggingIn;
    password = this.encryptPassword(password);
    const getUrl = APIs.login + '?' + queryString.stringify({username, password});
    try {
      const res = await fetch(getUrl);
      if (res.ok) {
        const user = await res.json();
        runInAction("login successfully", () => {
          this.state = LoginState.LoggedIn;
          this.user = new User(user);
        });
        return { success: true };
      } else {
        const resJson = await res.json();
        return runInAction("login failed", () => {
          this.logout();
          console.log(res.status);
          if (res.status === 401) {
            return { success: false, error: { type: LoginErrorType.WrongCredential } };
          } else {
            return { success: false, error: { type: LoginErrorType.ServerError, messages: resJson.errorDescriptions }};
          }
        });
      }

    } catch (e) {
      return runInAction("login failed", () => {
        this.logout();
        return {success: false, error: {type: LoginErrorType.NetworkError}};
      });
    }
  }
}