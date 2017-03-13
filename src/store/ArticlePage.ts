import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit, pathCombine } from '../Utils';
import { ExpireListAction } from './ArticleList';
import { Map } from 'immutable';
import fetch from 'isomorphic-fetch';


export type ArticlePagesState = Map<string, ArticleState>;

export type ArticleState = {
    article: Article
    lastUpdatedTime: number,
    status: ArticleStatus,
};

export const enum ArticleStatus {
    Initial,
    Received,
    Requesting,
    NotFound,
    Network,
    Deleted,
    Deleting,
    Expired,
    Others,
}

export interface RequestArticleAction { type: "REQUEST_ARTICLE", articleID: string }
export interface ReceiveArticleAction { type: "RECEIVE_ARTICLE", articleID: string, article: Article, updatedTime: number }
export interface ClearArticleAction { type: "CLEAR_ARTICLE", articleID: string }
export interface ErrorAction { type: "ERROR_ARTICLE", status: ArticleStatus, articleID: string }
export interface DeleteArticleAction { type: "DELETE_ARTICLE", articleID: string }
export interface SuccessDeleteArticleAction { type: "SUCCESS_DELETE_ARTICLE", articleID: string }
export interface ErrorDeleteArticleAction { type: "ERROR_DELETE_ARTICLE", articleID: string }
export interface ExpireArticleAction { type: "EXPIRE_ARTICLE", articleID: string}

type KnownAction =ExpireArticleAction| ExpireListAction | ErrorDeleteArticleAction | SuccessDeleteArticleAction | DeleteArticleAction | RequestArticleAction | ReceiveArticleAction | ErrorAction | ClearArticleAction;

export const actionCreators = {
    requestArticle: (articleID: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "REQUEST_ARTICLE", articleID: articleID });
        return fetch(pathCombine(APIs.articles, articleID)).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "RECEIVE_ARTICLE", articleID: articleID, article: json as Article, updatedTime: Date.now() });
                    });
                    break;
                case 404:
                    dispatch({ type: "ERROR_ARTICLE", status: ArticleStatus.NotFound, articleID: articleID });

                    break;
                default:
                    dispatch({ type: "ERROR_ARTICLE", status: ArticleStatus.Others, articleID: articleID });

            }
        }).catch(res => {
            dispatch({ type: "ERROR_ARTICLE", status: ArticleStatus.Network, articleID: articleID });

        });

    },
    clearArticle: () => ({ type: "CLEAR_ARTICLE" }),
    deleteArticle: (token: string, articleID: string, success?: (article: Article) => any, error?: (errorInfo: ArticleStatus) => any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "DELETE_ARTICLE", articleID: articleID });
        return fetch(pathCombine(APIs.articles, articleID), { method: "DELETE", mode: "cors", headers: { token: token } }).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_DELETE_ARTICLE", articleID: articleID });
                        dispatch({ type: "EXPIRE_LIST" });
                        success ? success(json as Article) : {};
                    });
                    break;
                case 404:
                    dispatch({ type: "ERROR_DELETE_ARTICLE", articleID: articleID });
                    error ? error(ArticleStatus.NotFound) : {};
                    break;
                default:
                    dispatch({ type: "ERROR_DELETE_ARTICLE", articleID: articleID });
                    error ? error(ArticleStatus.Others) : {};
            }
        }).catch(res => {
            dispatch({ type: "ERROR_DELETE_ARTICLE", articleID: articleID });
            error ? error(ArticleStatus.Others) : {};
        });
    }
};

export const initialState: ArticlePagesState = Map<string, ArticleState>();

export const reducer: Reducer<ArticlePagesState> = (state: ArticlePagesState, action: KnownAction) => {
    switch (action.type) {
        case "REQUEST_ARTICLE":
            return state.set(action.articleID, {...state.get(action.articleID), status: ArticleStatus.Requesting,   });
        case "RECEIVE_ARTICLE":
            return state.set(action.articleID, {status: ArticleStatus.Received, article: action.article, lastUpdatedTime: action.updatedTime});
        case "ERROR_ARTICLE":
            return state.set(action.articleID, { ...state.get(action.articleID), status: action.status });
        case "DELETE_ARTICLE":
            return state.set(action.articleID, { ...state.get(action.articleID), status: ArticleStatus.Deleting });
        case "CLEAR_ARTICLE":
            return state.remove(action.articleID);
        case "SUCCESS_DELETE_ARTICLE":
            return state.set(action.articleID, { ...state.get(action.articleID), status: ArticleStatus.Deleted });
        case "ERROR_DELETE_ARTICLE":
            return state.set(action.articleID, { ...state.get(action.articleID), status: ArticleStatus.Received });
        case "EXPIRE_LIST":
            return state;
        case "EXPIRE_ARTICLE":
            return state.set(action.articleID, {...state.get(action.articleID), status: ArticleStatus.Expired});
        default:
            const exhausiveCheck: never = action;
    };
    return state || initialState;
};


