import { action, computed, observable, runInAction } from "mobx";
import { User, UserRole } from "../models/User";
import * as queryString from "querystring";
import md5 from 'md5';
import { APIs } from "./ApiDefinition";

export class LoginError extends Error {

}

export class WrongCredentialError extends LoginError {

}

export class UnknownError extends LoginError {

}


export enum LoginState {
  NotLoggedIn,
  LoggingIn,
  LoggedIn
}

export class UserStore {
  @observable public user: User = null;
  @observable public state: LoginState = LoginState.NotLoggedIn;

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

  private encryptPassword(password: string) {
    return md5(password).toUpperCase();
  }

  @action public login = async (username: string, password: string) => {
    this.state = LoginState.LoggingIn;
    password = this.encryptPassword(password);
    const getUrl = APIs.login + '?' + queryString.stringify({username, password});
    try {
      const res = await fetch(getUrl);
      if (res.ok) {
        const user = await res.json();
        runInAction("login successfully", async () => {
          this.state = LoginState.LoggedIn;
          this.user = new User(user);
        });
      } else {
        runInAction("login failed", () => {
          this.logout();
          if (res.status === 401) {
            throw new WrongCredentialError();
          } else {
            throw new UnknownError();
          }
        });
      }

    } catch (e) {
      runInAction("login failed", () => {
        this.logout();
        throw new UnknownError();
      });
    }
  }
}