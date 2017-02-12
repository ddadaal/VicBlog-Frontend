import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit } from '../Utils';
import { ArticleBrief  } from './ArticleList';
export type Article = ArticleBrief & { content: string }

export interface ArticlePageState {
    article: Article
    lastUpdatedTime: number,
    status: Status
}

export enum Status {
    Initial,
    Received,
    Requesting,
    NotFound,
    Network,
    Others
}

interface RequestArticleAction { type:"REQUEST_ARTICLE", id: number }
interface ReceiveArticleAction { type: "RECEIVE_ARTICLE", article: Article, updatedTime: number}
interface ClearArticleAction { type: "CLEAR_ARTICLE" }
interface ErrorAction { type: "ERROR_ARTICLE", status : Status}

type KnownAction = RequestArticleAction | ReceiveArticleAction | ErrorAction |ClearArticleAction;

export const actionCreators = {
    requestArticle : (id: number):AppThunkAction<KnownAction> => (dispatch, getState)=>{
        fetch(`${APIs.article}${id}`).then(res=>{
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
        dispatch({type:"REQUEST_ARTICLE", id: id});
    },
    clearArticle: ()=>({type: "CLEAR_ARTICLE"})
};

export const initialState : ArticlePageState = {
    article: null,
    lastUpdatedTime: null,
    status: Status.Initial
};

export const reducer: Reducer<ArticlePageState> = (state: ArticlePageState, action: KnownAction)=>{
    switch(action.type){
        case "REQUEST_ARTICLE":
            return {...state , status: Status.Requesting };
        case "RECEIVE_ARTICLE":
            return { status: Status.Received, article: action.article, lastUpdatedTime:action.updatedTime };
        case "ERROR_ARTICLE":
            return {...state , status: action.status};
        case "CLEAR_ARTICLE":
            return initialState;
        default:
            const exhausiveCheck: never = action;
    };
    return state || initialState;
};


