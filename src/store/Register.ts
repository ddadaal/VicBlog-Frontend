import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit } from '../Utils';
import { User, SuccessLoginAction } from './User';

export interface RegisterStatus {
    status: Status,
    registerInfo: RegisterInfo
    registeredUser: User
}

export interface RegisterInfo {
    username: string,
    password: string,
    termsAgreed: boolean,

}

export enum Status {
    Initial,
    Registering,
    Success,
    UsernameExists,
    FormUsernameInvalid,
    FormPasswordInvalid,
    TermsNotAgreed,
    Network,
    Others
}

interface RegisterAction { type: "REGISTER", info: RegisterInfo }
interface SuccessRegisterAction { type: "SUCCESS_REGISTER", user: User }
interface ErrorRegisterAction { type: "ERROR_REGISTER", errorInfo: Status }
interface ChangeRegisterInfoAction { type: "CHANGE_REGISTER_INFO", info: RegisterInfo }
interface ChangeStatusAction { type: "CHANGE_STATUS", status: Status }
interface ResetStatusAction { type: "RESET_STATUS" }

type KnownAction = ErrorRegisterAction | SuccessRegisterAction | RegisterAction | SuccessLoginAction | ChangeRegisterInfoAction | ChangeStatusAction | ResetStatusAction;

export const actionCreators = {
    register: (info: RegisterInfo): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const url = APIs.regsiter;
        fetch(url, JSONRequestInit(info)).then(res => {
            switch (res.status) {
                case 201:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_REGISTER", user: json as User });
                    });
                    break;
                case 409:
                    dispatch({ type: "ERROR_REGISTER", errorInfo: Status.UsernameExists });
                    break;
                default:
                    dispatch({ type: "ERROR_REGISTER", errorInfo: Status.Others });
            }
        }).catch(res => {
            switch (res.status) {
                case 409:
                    dispatch({ type: "ERROR_REGISTER", errorInfo: Status.UsernameExists });
                    break;
                default:
                    dispatch({ type: "ERROR_REGISTER", errorInfo: Status.Network })
            }
        });
    },
    changeStatus: (status: Status) => ({ type: "CHANGE_STATUS", status: status }),
    changeRegisterInfo: (info: RegisterInfo) => ({ type: "CHANGE_REGISTER_INFO", info: info }),
    resetStatus: () => ({ type: "RESET_STATUS" }),
    directLogin: (user: User)=>({type:"SUCCESS_LOGIN", user: user})
}


export const initialState: RegisterStatus = {
    status: Status.Initial,
    registerInfo: {
        username: "",
        password: "",
        termsAgreed: false
    },
    registeredUser: null
}

export const reducer: Reducer<RegisterStatus> = (state: RegisterStatus, action: KnownAction) => {
    switch (action.type) {
        case "REGISTER":
            return { ...state, status: Status.Registering };
        case "SUCCESS_REGISTER":
            return { ...state, status: Status.Success, registeredUser: action.user };
        case "ERROR_REGISTER":
            return { ...state, status: action.errorInfo };
        case "SUCCESS_LOGIN":
            return state;
        case "CHANGE_REGISTER_INFO":
            return { ...state, registerInfo: action.info };
        case "CHANGE_STATUS":
            return { ...state, status: action.status };
        case "RESET_STATUS":
            return initialState;
        default:
            const exhausiveCheck: never = action;
    }
    return state || initialState;
}