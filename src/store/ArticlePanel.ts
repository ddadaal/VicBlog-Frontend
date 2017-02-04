import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs } from '../Utils';
import { ArticleBrief  } from './ArticleList';

export type Article = ArticleBrief & { content: string }

export interface ArticlePanelState {
    article: Article
    lastUpdatedTime: Date,
    errorInfo: ErrorType,
    isRequesting: boolean
}

enum ErrorType{
    None,
    NotFound,
    Others
}

interface RequestArticleAction { type:"REQUEST_ARTICLE", id: number }
interface ReceiveArticleAction { type: "RECEIVE_ARTICLE", article: Article}
interface ErrorAction { type: "ERROR", errorInfo: ErrorType }

type KnownAction = RequestArticleAction | ReceiveArticleAction | ErrorAction;

export const actionCreators = {
    requestArticle : (id: number):AppThunkAction<KnownAction> => (dispatch, getState)=>{
        fetch(`${APIs.article}+${id}`).then(res=>{
            switch(res.status){
                case 200:
                    res.json().then(json=>{
                        dispatch({type: "RECEIVE_ARTICLE", article: json as Article});
                    });
                    break;
                case 404:
                    dispatch({type:"ERROR", errorInfo: ErrorType.NotFound});
                    break;
                default:
                    dispatch({type:"ERROR", errorInfo: ErrorType.Others});
            }
        });
        dispatch({type:"REQUEST_ARTICLE", id: id});
    }
};

export const initialState : ArticlePanelState = {
    article: null,
    lastUpdatedTime: null,
    errorInfo: ErrorType.None,
    isRequesting: false
};

export const reducer: Reducer<ArticlePanelState> = (state: ArticlePanelState, action: KnownAction)=>{
    switch(action.type){
        case "REQUEST_ARTICLE":
            return { isRequesting: true, errorInfo: ErrorType.None, ...state };
        case "RECEIVE_ARTICLE":
            return {  isRequesting: false, errorInfo: ErrorType.None, article: action.article, lastUpdatedTime:new Date( Date.now()) };
        case "ERROR":
            return { isRequesting: true, errorInfo: action.errorInfo, ...state };
        default:
            const exhausiveCheck: never = action;
    };
    return state || initialState;
};


