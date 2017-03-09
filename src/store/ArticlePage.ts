import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit, pathCombine } from '../Utils';
import { ExpireListAction } from './ArticleList';
import fetch from 'isomorphic-fetch';


export interface ArticlePageState {
    article: Article
    lastUpdatedTime: number,
    pageStatus: PageStatus,
}

export const enum PageStatus {
    Initial,
    Received,
    Requesting,
    NotFound,
    Network,
    Deleted,
    Deleting,
    Others
}

export interface RequestArticleAction { type: "REQUEST_ARTICLE", articleID: string }
export interface ReceiveArticleAction { type: "RECEIVE_ARTICLE", article: Article, updatedTime: number }
export interface ClearArticleAction { type: "CLEAR_ARTICLE" }
export interface ErrorAction { type: "ERROR_ARTICLE", status: PageStatus }
export interface DeleteArticleAction { type: "DELETE_ARTICLE" }
export interface SuccessDeleteArticleAction { type: "SUCCESS_DELETE_ARTICLE" }
export interface ErrorDeleteArticleAction { type: "ERROR_DELETE_ARTICLE" }

type KnownAction = ExpireListAction | ErrorDeleteArticleAction | SuccessDeleteArticleAction | DeleteArticleAction | RequestArticleAction | ReceiveArticleAction | ErrorAction | ClearArticleAction;

export const actionCreators = {
    requestArticle: (articleID: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "REQUEST_ARTICLE", articleID: articleID });
        return fetch(pathCombine(APIs.articles, articleID)).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "RECEIVE_ARTICLE", article: json as Article, updatedTime: Date.now() });
                    });
                    break;
                case 404:
                    dispatch({ type: "ERROR_ARTICLE", status: PageStatus.NotFound });

                    break;
                default:
                    dispatch({ type: "ERROR_ARTICLE", status: PageStatus.Others });

            }
        }).catch(res => {
            dispatch({ type: "ERROR_ARTICLE", status: PageStatus.Network });

        });

    },
    clearArticle: () => ({ type: "CLEAR_ARTICLE" }),
    deleteArticle: (token: string, articleID: string, success?: (article: Article) => any, error?: (errorInfo: PageStatus) => any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "DELETE_ARTICLE" });
        return fetch(pathCombine(APIs.articles,articleID), { method: "DELETE", mode: "cors", headers: { token: token } }).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_DELETE_ARTICLE" });
                        dispatch({ type: "EXPIRE_LIST" });
                        success ? success(json as Article) : {};
                    });
                    break;
                case 404:
                    dispatch({ type: "ERROR_DELETE_ARTICLE" });
                    error ? error(PageStatus.NotFound) : {};
                    break;
                default:
                    dispatch({ type: "ERROR_DELETE_ARTICLE" });
                    error ? error(PageStatus.Others) : {};
            }
        }).catch(res => {
            dispatch({ type: "ERROR_DELETE_ARTICLE" });
            error ? error(PageStatus.Others) : {};
        });
    }
};

export const initialState: ArticlePageState = {
    article: null,
    lastUpdatedTime: null,
    pageStatus: PageStatus.Initial,
};

export const reducer: Reducer<ArticlePageState> = (state: ArticlePageState, action: KnownAction) => {
    switch (action.type) {
        case "REQUEST_ARTICLE":
            return { ...state, pageStatus: PageStatus.Requesting };
        case "RECEIVE_ARTICLE":
            return { ...state, pageStatus: PageStatus.Received, article: action.article, lastUpdatedTime: action.updatedTime };
        case "ERROR_ARTICLE":
            return { ...state, pageStatus: action.status };
        case "CLEAR_ARTICLE":
            return initialState;
        case "DELETE_ARTICLE":
            return { ...state, pageStatus: PageStatus.Deleting };
        case "SUCCESS_DELETE_ARTICLE":
            return { ...state, pageStatus: PageStatus.Deleted };
        case "ERROR_DELETE_ARTICLE":
            return { ...state, pageStatus: PageStatus.Received };
        case "EXPIRE_LIST":
            return state;
        default:
            const exhausiveCheck: never = action;
    };
    return state || initialState;
};


