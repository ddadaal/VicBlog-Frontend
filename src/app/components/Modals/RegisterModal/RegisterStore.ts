import { action, observable, runInAction } from "mobx";
import { encryptPassword, LoginResult, } from "../../../stores/UserStore";
import { APIs } from "../../../api/ApiDefinition";

export enum RegisterState {
  Standby, Registering, Registered
}

export enum RegisterErrorType {
  UsernameConflict, ServerError, NetworkError
}

type RegisterResult = LoginResult;


export interface RegisterError {
  type: RegisterErrorType
}

export interface RegisterServerError extends RegisterError {
  type: RegisterErrorType.ServerError,
  messages: string[]
}

export interface RegisterNetworkError extends RegisterError {
  type: RegisterErrorType.NetworkError,
  error: any
}



export class RegisterStore {
  @observable state: RegisterState = RegisterState.Standby;

  @action reset = () => {
    this.state = RegisterState.Standby;
  };

  @action requestRegister = async (username: string, password: string): Promise<RegisterResult> => {
    this.state = RegisterState.Registering;
    password = encryptPassword(password);
    const getUrl = APIs.register;
    let error: RegisterError = null;
    try {
      const res = await fetch(getUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
      const response = await res.json();
      if (res.ok) {
        return runInAction("requestRegister success", () => {
          this.state = RegisterState.Registered;
          return response;
        });
      } else {
        runInAction("requestRegister failed", async () => {
          this.state = RegisterState.Standby;
        });
        if (res.status === 409) {
          error = {type: RegisterErrorType.UsernameConflict};
        } else {
          error = {type: RegisterErrorType.ServerError, messages: response.errorDescriptions} as RegisterServerError;
        }
      }
    } catch (e) {
      runInAction("requestRegister failed", () => {
        this.state = RegisterState.Standby;
      });
      error = {type: RegisterErrorType.NetworkError, error: e } as RegisterNetworkError;
    }
    throw error;
  };
}