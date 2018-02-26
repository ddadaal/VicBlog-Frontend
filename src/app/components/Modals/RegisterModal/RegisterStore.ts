import { action, observable, runInAction } from "mobx";
import { encryptPassword, LoginResult, } from "../../../stores/UserStore";
import { APIs } from "../../../api/ApiDefinition";
import { HttpMethod, NetworkStore } from "../../../stores/NetworkStore";

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

    const res = await NetworkStore.fetch(getUrl, HttpMethod.POST, JSON.stringify({username, password}));
    const {statusCode, response, error, ok, isNetworkError} = res;
    if (ok) {
      return runInAction("requestRegister success", () => {
        this.state = RegisterState.Registered;
        return response;
      });
    }
    runInAction("requestRegister failed", async () => {
      this.state = RegisterState.Standby;
    });
    if (isNetworkError) {
      throw {type: RegisterErrorType.NetworkError, error: error} as RegisterNetworkError;
    } else if (statusCode === 409) {
      throw {type: RegisterErrorType.UsernameConflict};
    } else {
      throw {type: RegisterErrorType.ServerError, messages: response.errorDescriptions} as RegisterServerError;
    }
  }
}