import * as React from 'react';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { Map } from 'immutable';
import { APIs, attachQueryString, JSONRequestInit, pathCombine } from '../Utils';
import fetch from 'isomorphic-fetch';

export interface PV {
    pv: number,
    updatedTime: number,
    fetching: boolean,
    error: boolean
}

export type PVState = Map<string, PV>;

export interface FetchPVAction { type: "FETCH_PV", articleID: string }
export interface UpdatePVAction { type: "UPDATE_PV", articleID: string, pv: number, updatedTime: number }
export interface RemovePVAction { type: "REMOVE_PV", articleID: string }
export interface ErrorPVAction { type: "ERROR_PV", articleID: string }

type KnownAction = FetchPVAction | UpdatePVAction | RemovePVAction | ErrorPVAction;

export const actionCreators = {
    fetchPV: (articleID: string) => (dispatch, getState) => {
        dispatch({ type: "FETCH_PV", articleID: articleID });
        return fetch(attachQueryString(APIs.pv, { ID: articleID }))
        .then(res => res.json())
        .then(value => dispatch({ type: "UPDATE_PV", articleID: articleID, pv: value as any, updatedTime: Date.now() }))
        .catch(res => dispatch({ type: "ERROR_PV", articleID: articleID }));
    }
}

export const initialState: PVState = Map<string, PV>();

export const reducer : Reducer<PVState> = (state: PVState, action: KnownAction)=>{
    switch(action.type){
        case "FETCH_PV":
            return state.set(action.articleID, { pv: -1, updatedTime: 0, fetching: true, error: false  } );
        case "UPDATE_PV":
            return state.set(action.articleID, { pv: action.pv, updatedTime: action.updatedTime, error: false, fetching: false });
        case "REMOVE_PV":
            return state.remove(action.articleID);
        case "ERROR_PV":
            return state.set(action.articleID, {pv: -1, updatedTime: 0, error: true, fetching: false });
    }
    return state || initialState;
}




