import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit } from '../Utils';
import fetch from 'isomorphic-fetch';

declare const FRONT_END_BUILD:string;
declare const FRONT_END_BUILDTIME:string;

export interface VersionInfo{
    version: string,
    updateTime: string
}

export interface VersionState {
    fetching: boolean,
    error: boolean,
    backend: VersionInfo,
    frontend: VersionInfo
}

export interface FetchVersionInfoAction { type: "FETCH_VERSION_INFO" }
export interface SuccessVersionInfoAction { type: "SUCCSS_VERSION_INFO", info: VersionInfo }
export interface ErrorVersionInfoAction { type: "ERROR_VERSION_INFO" }
type KnownAction = FetchVersionInfoAction | SuccessVersionInfoAction | ErrorVersionInfoAction;

export const actionCreators = {
    fetchVersionInfo: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "FETCH_VERSION_INFO" });
        return fetch(APIs.backendVersion)
        .then(res => res.json())
        .then(value => dispatch({ type: "SUCCSS_VERSION_INFO", info: value as any }))
        .catch(res => dispatch({ type: "ERROR_VERSION_INFO" }));
    },
    resetApp:():AppThunkAction<KnownAction>=>(dispatch, getState)=>{
        localStorage.removeItem("user");
    }
}

export const initialState: VersionState = {
    fetching: false,
    error: false,
    backend: {
        version: "",
        updateTime: ""
    },
    frontend: {
        version: FRONT_END_BUILD,
        updateTime: FRONT_END_BUILDTIME
    }
};

export const reducer : Reducer<VersionState> = (state: VersionState, action: KnownAction)=>{
    switch(action.type){
        case "FETCH_VERSION_INFO":
            return {...state, fetching: true};
        case "SUCCSS_VERSION_INFO":
            return {...state, fetching: false, error: false, backend: action.info};
        case "ERROR_VERSION_INFO":
            return {...state, error: true, fetching: false};
    }
    return state || initialState;
}


