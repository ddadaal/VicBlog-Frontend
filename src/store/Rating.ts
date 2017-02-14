import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, attachQueryString, JSONRequestInit } from '../Utils';

export enum RatingStatus {
    Initial,
    Success,
    Sending,
    ArticleNotFound,
    ScoreNotInRange,
    Unauthorized,
    Conflict,
    Others,
    Network
}

export interface RatingState{
    status: RatingStatus,
    articleID: string,
    score: number,
}

interface RateAction { type: "RATE_ARTICLE", articleID: string}
interface SuccessRateAction { type: "SUCCESS_RATE_ARTICLE", newScore: number }
interface ErrorRateAction { type: "ERROR_RATE_ARTICLE", errorInfo: RatingStatus}
interface InitStatusAction { type: "INIT_STATUS"}
interface ResetAllStatesAction { type: "RESET_ALL_STATES"}

type KnownAction =ResetAllStatesAction| RateAction | SuccessRateAction|ErrorRateAction|InitStatusAction;

export const actionCreators = {
    rate: (articleID:string, score: number, token: string):AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "RATE_ARTICLE", articleID: articleID});
        return fetch(`${APIs.rate}${articleID}`,JSONRequestInit({ token: token, score: score })).then(res=>{
            switch(res.status){
                case 201:
                    res.json().then(json=>dispatch({type: "SUCCESS_RATE_ARTICLE", newScore: json}));
                    //callback(RatingStatus.Success);
                    break;
                case 401:
                    dispatch({type: "ERROR_RATE_ARTICLE", errorInfo: RatingStatus.ScoreNotInRange});
                    //callback(RatingStatus.ScoreNotInRange);
                    break;
                case 404:
                    dispatch({type: "ERROR_RATE_ARTICLE", errorInfo: RatingStatus.ArticleNotFound});
                    //callback(RatingStatus.ArticleNotFound);
                    break;
                default:
                    dispatch({type: "ERROR_RATE_ARTICLE", errorInfo: RatingStatus.Others});
                    //callback(RatingStatus.Others);
            }
        }).catch(res=>{
            dispatch({type: "ERROR_RATE_ARTICLE", errorInfo: RatingStatus.Network});
            //callback(RatingStatus.Network);
        });
    },
    resetAllStates: ()=>({type: "RESET_ALL_STATES"}),
    initStatus: ()=>({type: "INIT_STATUS"})
}

export const initialState:RatingState = {
    status: RatingStatus.Initial,
    articleID: "",
    score: 0
}

export const reducer: Reducer<RatingState> = (state:RatingState, action:KnownAction)=>{
    switch(action.type){
        case "RATE_ARTICLE":
            return {...state, status: RatingStatus.Sending, articleID: action.articleID};
        case "SUCCESS_RATE_ARTICLE":
            return {...state, status: RatingStatus.Success};
        case "ERROR_RATE_ARTICLE":
            return {...state, status:action.errorInfo};
        case "RESET_ALL_STATES":
            return initialState;
        case "INIT_STATUS":
            return {...state, status: RatingStatus.Initial};
        default:
            const exhausiveCheck:never = action;
    }
    return state||initialState;
}