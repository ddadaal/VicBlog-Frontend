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
    isLoggingIn: boolean,
    errorInfo: LoginError,
    loginModalVisible: boolean
}

export interface LoginInfo {
    username: string,
    password: string,
    remember: boolean
}

export enum LoginError {
    Forbid,
    Others,
    None
}


interface RequestLoginAction { type: "REQUEST_LOGIN", info: LoginInfo }
interface SuccessLoginAction { type: "SUCCESS_LOGIN", user: User }
interface ErrorLoginAction { type: "ERROR_LOGIN", errorInfo: LoginError }
interface LogoutAction { type: "LOGOUT" }
interface OpenLoginModalAction { type: "OPEN_LOGIN_MODAL" }
interface CloseLoginModalAction { type: "CLOSE_LOGIN_MODAL" }

type KnownAction = LogoutAction | RequestLoginAction | SuccessLoginAction | ErrorLoginAction | OpenLoginModalAction | CloseLoginModalAction;

export const actionCreators = {
    logout: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
    },
    requestLogin: (info: LoginInfo): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: "REQUEST_LOGIN", info: info });

        const url = `${APIs.login}?username=${info.username}&password=${info.password}`;

        fetch(url).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_LOGIN", user: json as User});
                        dispatch({ type: "CLOSE_LOGIN_MODAL" });
                        if (info.remember) {
                            localStorage.setItem("user", JSON.stringify(getState().user));
                        }
                    });
                    break;
                case 403:
                    dispatch({ type: "ERROR_LOGIN", errorInfo: LoginError.Forbid });
                    break;
                default:
                    dispatch({ type: "ERROR_LOGIN", errorInfo: LoginError.Others });
            }
        }).catch(res => dispatch({ type: "ERROR_LOGIN", errorInfo: LoginError.Others }));


    },
    openLoginModal: () => ({ type: "OPEN_LOGIN_MODAL" } as OpenLoginModalAction),
    closeLoginModal: () => ({ type: "CLOSE_LOGIN_MODAL" } as CloseLoginModalAction)

}

const initialState: UserState = { user: null, isLoggingIn: false, errorInfo: LoginError.None, loginModalVisible: false }

export const reducer: Reducer<UserState> = (state: UserState, action: KnownAction) => {
    switch (action.type) {
        case "LOGOUT":
            return { ...state, user: null, isLoggingIn: false, errorInfo: LoginError.None };
        case "REQUEST_LOGIN":
            return { ...state, user: null, isLoggingIn: true, errorInfo: LoginError.None };
        case "SUCCESS_LOGIN":
            return { ...state, user: action.user, isLoggingIn: false, errorInfo: LoginError.None };
        case "ERROR_LOGIN":
            return { ...state, user: null, isLoggingIn: false, errorInfo: action.errorInfo, };
        case "OPEN_LOGIN_MODAL":
            return { ...state, loginModalVisible: true };
        case "CLOSE_LOGIN_MODAL":
            return { ...state, loginModalVisible: false };
        default:
            const exhaustiveCheck: never = action;
    }
    return state || initialState;
}