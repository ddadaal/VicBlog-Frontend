import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import fetch from 'isomorphic-fetch';
import { APIs, attachQueryString, JSONRequestInit, pathCombine } from '../Utils';
import { TokenOutdatedAction } from './User';

export const enum RatingError {
    ArticleNotFound,
    ScoreNotInRange,
    Unauthorized,
    Conflict,
    Others,
    Network,
    TokenOutdated
}

export interface RatingState {
    sending: boolean,
    articleID: string,
    score: number,
    
}

export interface RateAction { type: "RATE_ARTICLE", articleID: string }
export interface SuccessRateAction { type: "SUCCESS_RATE_ARTICLE", newScore: number }
export interface ErrorRateAction { type: "ERROR_RATE_ARTICLE" }
export interface ResetAllStatesAction { type: "RESET_ALL_STATES" }

type KnownAction = ResetAllStatesAction | RateAction | SuccessRateAction | ErrorRateAction|TokenOutdatedAction;

export const actionCreators = {
    rate: (articleID: string, score: number, token: string, success?: (newScore: number) => any, error?: (info: RatingError) => any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "RATE_ARTICLE", articleID: articleID });
        return fetch(pathCombine(APIs.rate, articleID), JSONRequestInit({score: score},{token: token})).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_RATE_ARTICLE", newScore: json });
                        if (success) success(json);
                    });
                    break;
                case 401:
                    dispatch({ type: "ERROR_RATE_ARTICLE" });
                    if (error) error(RatingError.ScoreNotInRange);
                    break;
                case 403:
                    dispatch({type: "ERROR_RATE_ARTICLE"});
                    dispatch({type: "TOKEN_OUTDATED"});
                    if (error) error(RatingError.TokenOutdated);
                    break;
                case 404:
                    dispatch({ type: "ERROR_RATE_ARTICLE" });
                    if (error) error(RatingError.ArticleNotFound);
                    break;
                default:
                    dispatch({ type: "ERROR_RATE_ARTICLE" });
                    if (error) error(RatingError.Others);
            }
        }).catch(res => {
            dispatch({ type: "ERROR_RATE_ARTICLE" });
            if (error) error(RatingError.Network);
        });
    },
    resetAllStates: () => ({ type: "RESET_ALL_STATES" }),
}

export const initialState: RatingState = {
    sending: false,
    articleID: "",
    score: 0
}

export const reducer: Reducer<RatingState> = (state: RatingState, action: KnownAction) => {
    switch (action.type) {
        case "RATE_ARTICLE":
            return { ...state, sending: true, articleID: action.articleID };
        case "SUCCESS_RATE_ARTICLE":
            return { ...state, sending: false };
        case "ERROR_RATE_ARTICLE":
            return { ...state, sending: false };
        case "RESET_ALL_STATES":
            return initialState;
        case "TOKEN_OUTDATED":
            return state;
        default:
            const exhausiveCheck: never = action;
    }
    return state || initialState;
}