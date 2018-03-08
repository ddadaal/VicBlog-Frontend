import { action, observable, runInAction } from "mobx";
import { LoginResult, UserService } from "../../../api/UserService";

export enum RegisterState {
  Standby, Registering, Registered
}

export enum RegisterErrorType {
  UsernameConflict, ServerError, NetworkError, Server500Error
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

const service = new UserService();

export class RegisterStore {
  @observable state: RegisterState = RegisterState.Standby;

  @action reset = () => {
    this.state = RegisterState.Standby;
  };

  @action requestRegister = async (username: string, password: string): Promise<RegisterResult> => {
    this.state = RegisterState.Registering;


    const res = await service.register(username, password);

    const {statusCode, response, error, ok} = res;
    if (ok) {
      return runInAction("requestRegister success", () => {
        this.state = RegisterState.Registered;
        return response;
      });
    }
    runInAction("requestRegister failed", async () => {
      this.state = RegisterState.Standby;
    });
    console.log(error);
    if (error.isNetworkError) {
      throw {type: RegisterErrorType.NetworkError, error: error.info} as RegisterNetworkError;
    } else if (error.isServerError) {
      throw {type: RegisterErrorType.Server500Error};
    } else if (statusCode === 409) {
      throw {type: RegisterErrorType.UsernameConflict};
    } else {
      throw {type: RegisterErrorType.ServerError, messages: response.errorDescriptions} as RegisterServerError;
    }
  }
}
