import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit } from '../Utils';
import { ArticleBrief, ExpireListAction } from './ArticleList';
import fetch from 'isomorphic-fetch';
export type Article = ArticleBrief & { content: string }


export interface ArticlePageState {
    article: Article
    lastUpdatedTime: number,
    pageStatus: Status,
}

export enum Status {
    Initial,
    Received,
    Requesting,
    NotFound,
    Network,
    Deleted,
    Deleting,
    Others
}

interface RequestArticleAction { type: "REQUEST_ARTICLE", articleID: string }
interface ReceiveArticleAction { type: "RECEIVE_ARTICLE", article: Article, updatedTime: number }
interface ClearArticleAction { type: "CLEAR_ARTICLE" }
interface ErrorAction { type: "ERROR_ARTICLE", status: Status }
interface DeleteArticleAction { type: "DELETE_ARTICLE" }
interface SuccessDeleteArticleAction { type: "SUCCESS_DELETE_ARTICLE" }
interface ErrorDeleteArticleAction { type: "ERROR_DELETE_ARTICLE" }

type KnownAction = ExpireListAction | ErrorDeleteArticleAction | SuccessDeleteArticleAction | DeleteArticleAction | RequestArticleAction | ReceiveArticleAction | ErrorAction | ClearArticleAction;

export const actionCreators = {
    requestArticle: (articleID: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "REQUEST_ARTICLE", articleID: articleID });
        return fetch(`${APIs.article}${articleID}`).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "RECEIVE_ARTICLE", article: json as Article, updatedTime: Date.now() });
                    });
                    break;
                case 404:
                    dispatch({ type: "ERROR_ARTICLE", status: Status.NotFound });

                    break;
                default:
                    dispatch({ type: "ERROR_ARTICLE", status: Status.Others });

            }
        }).catch(res => {
            dispatch({ type: "ERROR_ARTICLE", status: Status.Network });

        });

    },
    clearArticle: () => ({ type: "CLEAR_ARTICLE" }),
    deleteArticle: (token: string, articleID: string, success?: (article: Article) => any, error?: (errorInfo: Status) => any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "DELETE_ARTICLE" });
        return fetch(`${APIs.article}${articleID}`, { method: "DELETE", mode: "cors", headers: { token: token } }).then(res => {
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
                    error ? error(Status.NotFound) : {};
                    break;
                default:
                    dispatch({ type: "ERROR_DELETE_ARTICLE" });
                    error ? error(Status.Others) : {};
            }
        }).catch(res => {
            dispatch({ type: "ERROR_DELETE_ARTICLE" });
            error ? error(Status.Network) : {};
        });
    }
};

export const initialState: ArticlePageState = {
    article: null,
    lastUpdatedTime: null,
    pageStatus: Status.Initial,
};

export const reducer: Reducer<ArticlePageState> = (state: ArticlePageState, action: KnownAction) => {
    switch (action.type) {
        case "REQUEST_ARTICLE":
            return { ...state, pageStatus: Status.Requesting };
        case "RECEIVE_ARTICLE":
            return { ...state, pageStatus: Status.Received, article: action.article, lastUpdatedTime: action.updatedTime };
        case "ERROR_ARTICLE":
            return { ...state, pageStatus: action.status };
        case "CLEAR_ARTICLE":
            return initialState;
        case "DELETE_ARTICLE":
            return { ...state, pageStatus: Status.Deleting };
        case "SUCCESS_DELETE_ARTICLE":
            return { ...state, pageStatus: Status.Deleted };
        case "ERROR_DELETE_ARTICLE":
            return { ...state, pageStatus: Status.Received };
        case "EXPIRE_LIST":
            return state;
        default:
            const exhausiveCheck: never = action;
    };
    return state || initialState;
};


