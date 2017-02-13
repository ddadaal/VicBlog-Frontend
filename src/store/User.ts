import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs } from '../Utils';

export enum UserRole {
    User,
    Admin,
    Unclear
}

export interface User {
    username: string,
    role: UserRole,
    token: string
}

export interface UserState {
    user: User,
    status: Status,
    loginModalVisible: boolean
}

export interface LoginInfo {
    username: string,
    password: string,
    remember: boolean
}

export enum Status {
    Initial,
    LoggingIn,
    LoggedIn,
    FormUsernameInvalid,
    FormPasswordInvalid,
    Network,
    CredentialInvalid,
    Others
}


interface RequestLoginAction { type: "REQUEST_LOGIN", info: LoginInfo }
export interface SuccessLoginAction { type: "SUCCESS_LOGIN", user: User }
interface ErrorLoginAction { type: "ERROR_LOGIN", status: Status }
interface LogoutAction { type: "LOGOUT" }
interface OpenLoginModalAction { type: "OPEN_LOGIN_MODAL" }
interface CloseLoginModalAction { type: "CLOSE_LOGIN_MODAL" }
interface SetUserStatusAction { type: "SET_USER_STATUS", status: Status}

type KnownAction = SetUserStatusAction|LogoutAction | RequestLoginAction | SuccessLoginAction | ErrorLoginAction | OpenLoginModalAction | CloseLoginModalAction;

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
                case 403:
                    dispatch({ type: "ERROR_LOGIN", status: Status.CredentialInvalid });
                    break;
                default:
                    dispatch({ type: "ERROR_LOGIN", status: Status.Others });
            }
        }).catch(res => dispatch({ type: "ERROR_LOGIN", status: Status.Network }));


    },
    openLoginModal: () => ({ type: "OPEN_LOGIN_MODAL" } as OpenLoginModalAction),
    closeLoginModal: () => ({ type: "CLOSE_LOGIN_MODAL" } as CloseLoginModalAction),
    setUserStatus: (status: Status)=>({type: "SET_USER_STATUS", status: status} as SetUserStatusAction)
}

const initialState: UserState = { user: null, status: Status.Initial, loginModalVisible: false }

export const reducer: Reducer<UserState> = (state: UserState, action: KnownAction) => {
    switch (action.type) {
        case "LOGOUT":
            return { ...state, user: null, status: Status.Initial };
        case "REQUEST_LOGIN":
            return { ...state, user: null, status: Status.LoggingIn };
        case "SUCCESS_LOGIN":
            return { ...state, user: action.user, status: Status.LoggedIn };
        case "ERROR_LOGIN":
            return { ...state, user: null, status: action.status, };
        case "OPEN_LOGIN_MODAL":
            return { ...state, loginModalVisible: true };
        case "CLOSE_LOGIN_MODAL":
            return { ...state, loginModalVisible: false };
        case "SET_USER_STATUS":
            return {...state, status: action.status};
        default:
            const exhaustiveCheck: never = action;
    }
    return state || initialState;
}