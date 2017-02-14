import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit } from '../Utils';
import { ArticleBrief  } from './ArticleList';
export type Article = ArticleBrief & { content: string }


export interface ArticlePageState {
    article: Article
    lastUpdatedTime: number,
    pageStatus: Status,
    ratingStatus :RatingStatus
}

export enum RatingStatus{
    Initial,
    Sending,
    Success,
    ScoreNotInRange,
    Unauthorized,
    ArticleNotFound,
    Conflict,
    Others,
    Network
}

export enum Status {
    Initial,
    Received,
    Requesting,
    NotFound,
    Network,

    Others
}

interface RequestArticleAction { type:"REQUEST_ARTICLE", articleID: string }
interface ReceiveArticleAction { type: "RECEIVE_ARTICLE", article: Article, updatedTime: number}
interface ClearArticleAction { type: "CLEAR_ARTICLE" }
interface ErrorAction { type: "ERROR_ARTICLE", status : Status}
interface RateAction{type: "RATE"}
interface SuccessRateAction{type: "SUCCESS_RATE"}
interface ErrorRateAction{type: "ERROR_RATE", errorInfo: RatingStatus }

type KnownAction =ErrorRateAction|SuccessRateAction|RateAction | RequestArticleAction | ReceiveArticleAction | ErrorAction |ClearArticleAction;

export const actionCreators = {
    requestArticle : (articleID: string):AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type:"REQUEST_ARTICLE", articleID: articleID});
        return fetch(`${APIs.article}${articleID}`).then(res=>{
            switch(res.status){
                case 200:
                    res.json().then(json=>{
                        dispatch({type: "RECEIVE_ARTICLE", article: json as Article, updatedTime: Date.now()});
                    });
                    break;
                case 404:
                    dispatch({type:"ERROR_ARTICLE", status: Status.NotFound});
                    break;
                default:
                    dispatch({type:"ERROR_ARTICLE", status: Status.Others});
            }
        }).catch(res=>{
            dispatch({type:"ERROR_ARTICLE",status: Status.Network});
        });

    },
    clearArticle: ()=>({type: "CLEAR_ARTICLE"}),
    
};

export const initialState : ArticlePageState = {
    article: null,
    lastUpdatedTime: null,
    pageStatus: Status.Initial,
    ratingStatus: RatingStatus.Initial
};

export const reducer: Reducer<ArticlePageState> = (state: ArticlePageState, action: KnownAction)=>{
    switch(action.type){
        case "REQUEST_ARTICLE":
            return {...state , pageStatus: Status.Requesting };
        case "RECEIVE_ARTICLE":
            return { ...state, pageStatus: Status.Received, article: action.article, lastUpdatedTime:action.updatedTime };
        case "ERROR_ARTICLE":
            return {...state , pageStatus: action.status};
        case "CLEAR_ARTICLE":
            return initialState;
        case "RATE":
            return {...state, ratingStatus: RatingStatus.Sending };
        case "SUCCESS_RATE":
            return {...state, ratingStatus: RatingStatus.Success };
        case "ERROR_RATE":
            return {...state, ratingStatus: action.errorInfo};
        default:
            const exhausiveCheck: never = action;
    };
    return state || initialState;
};


