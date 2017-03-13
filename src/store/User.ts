import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit } from '../Utils';
import fetch from 'isomorphic-fetch';

export interface User {
    username: string,
    role: UserRole,
    token: string
}

export const enum UserRole {
    User,
    Admin,
    Unclear
}




export interface UserState {
    user: User,
    status: UserStatus,
    loginModalVisible: boolean,
    registerModalVisible: boolean
}

export interface LoginInfo {
    username: string,
    password: string,
    remember: boolean
}

export interface RegisterInfo {
    username: string,
    password: string,
}


export const enum UserStatus {
    Initial,
    LoggingIn,
    LoggedIn,
    FormUsernameInvalid,
    FormPasswordInvalid,
    Network,
    CredentialInvalid,
    TokenOutdated,
    TokenInvalid,
    Others
}


export interface RequestLoginAction { type: "REQUEST_LOGIN", info: LoginInfo }
export interface SuccessLoginAction { type: "SUCCESS_LOGIN", user: User }
export interface ErrorLoginAction { type: "ERROR_LOGIN", status: UserStatus }
export interface LogoutAction { type: "LOGOUT" }
export interface OpenLoginModalAction { type: "OPEN_LOGIN_MODAL" }
export interface CloseLoginModalAction { type: "CLOSE_LOGIN_MODAL" }
export interface OpenRegisterModalAction { type: "OPEN_REGISTER_MODAL" }
export interface CloseRegisterModalAction { type: "CLOSE_REGISTER_MODAL" }
export interface SetStatusAction { type: "SET_USER_STATUS", status: UserStatus }
export interface TokenOutdatedAction { type: "TOKEN_OUTDATED"  }
export interface TokenInvalidAction { type: "TOKEN_INVALID"}

type KnownAction =TokenInvalidAction|TokenOutdatedAction| CloseRegisterModalAction | OpenRegisterModalAction | SetStatusAction | LogoutAction | RequestLoginAction | SuccessLoginAction | ErrorLoginAction | OpenLoginModalAction | CloseLoginModalAction;

export const actionCreators = {
    logout: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
    },
    requestLogin: (info: LoginInfo): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: "REQUEST_LOGIN", info: info });

        const url = `${APIs.login}?username=${info.username}&password=${info.password}`;

        return fetch(url).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_LOGIN", user: json as User });
                        dispatch({ type: "CLOSE_LOGIN_MODAL" });
                        if (info.remember) {
                            localStorage.setItem("user", JSON.stringify(getState().user));
                        }
                    });
                    break;
                case 401:
                    dispatch({ type: "ERROR_LOGIN", status: UserStatus.CredentialInvalid });
                    break;
                default:
                    dispatch({ type: "ERROR_LOGIN", status: UserStatus.Others });
            }
        }).catch(res => dispatch({ type: "ERROR_LOGIN", status: UserStatus.Network }));
    },
    directLogin: (user: User, remember: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "SUCCESS_LOGIN", user: user });
        if (remember) {
            localStorage.setItem("user", JSON.stringify(getState().user));
        }
    },
    openLoginModal: () => ({ type: "OPEN_LOGIN_MODAL" } as OpenLoginModalAction),
    closeLoginModal: () => ({ type: "CLOSE_LOGIN_MODAL" } as CloseLoginModalAction),
    openRegisterModal: () => ({ type: "OPEN_REGISTER_MODAL" } as OpenRegisterModalAction),
    closeRegisterModal: () => ({ type: "CLOSE_REGISTER_MODAL" } as CloseRegisterModalAction),
    setStatus: (status: UserStatus) => ({ type: "SET_USER_STATUS", status: status } as SetStatusAction),

}

export const initialState: UserState = { user: null, status: UserStatus.Initial, loginModalVisible: false, registerModalVisible: false }

export const reducer: Reducer<UserState> = (state: UserState, action: KnownAction) => {
    switch (action.type) {
        case "LOGOUT":
            return { ...state, user: null, status: UserStatus.Initial };
        case "REQUEST_LOGIN":
            return { ...state, user: null, status: UserStatus.LoggingIn };
        case "SUCCESS_LOGIN":
            return { ...state, user: action.user, status: UserStatus.LoggedIn };
        case "ERROR_LOGIN":
            return { ...state, user: null, status: action.status, };
        case "OPEN_LOGIN_MODAL":
            return { ...state, loginModalVisible: true };
        case "CLOSE_LOGIN_MODAL":
            return { ...state, loginModalVisible: false, status: state.status == UserStatus.LoggedIn ? UserStatus.LoggedIn : UserStatus.Initial };
        case "SET_USER_STATUS":
            return { ...state, status: action.status };
        case "OPEN_REGISTER_MODAL":
            return { ...state, registerModalVisible: true };
        case "CLOSE_REGISTER_MODAL":
            return { ...state, registerModalVisible: false };
        case "TOKEN_OUTDATED":
            return {...state, status: UserStatus.TokenOutdated};
        case "TOKEN_INVALID":
            return {...state, status: UserStatus.TokenInvalid};
        default:
            const exhaustiveCheck: never = action;
    }
    return state || initialState;
}