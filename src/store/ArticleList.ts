import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, JSONRequestInit } from '../Utils';
import moment from 'moment';
import { actionCreators as listActionCreators } from './ArticleList';
import { ArticleFilter, ArticleBriefListOrder } from './ArticleListFilter';
import fetch from 'isomorphic-fetch';

export interface SectionState<ContentType> {
    content: ContentType[],
    status: ContentStatus
}

export interface ArticleListState {
    tags: SectionState<string>,
    categories: SectionState<string>,
    articleList: SectionState<ArticleBrief> & { lastUpdatedTime: number }
    searching: boolean,
    expired: boolean
}


export const enum ContentStatus {
    Initial,
    Requesting,
    Received,
    Network,
    Others
}

export interface ErrorTags { type: "ERROR_TAGS", status: ContentStatus }
export interface ErrorCategories { type: "ERROR_CATEGORIES", status: ContentStatus }
export interface ErrorArticleList { type: "ERROR_ARTICLE_LIST", status: ContentStatus }
export interface RequestTags { type: "REQUEST_TAGS" }
export interface ReceiveTags { type: "RECEIVE_TAGS", tags: string[] }
export interface RequestCategories { type: "REQUEST_CATEGORIES" }
export interface ReceiveCategories { type: "RECEIVE_CATEGORIES", categories: string[] }
export interface RequestAllArticle { type: "REQUEST_ALL_ARTICLES" }
export interface ReceiveArticleList { type: "RECEIVE_ARTICLE_LIST", articleList: ArticleBrief[], updatedTime: number }
export interface RequestSearch { type: "REQUEST_SEARCH", filter: ArticleFilter }

export interface ExpireListAction { type: "EXPIRE_LIST" }

type KnownAction =ExpireListAction | RequestSearch | ErrorTags | ErrorCategories | ErrorArticleList | RequestTags | ReceiveTags | RequestCategories | ReceiveCategories | RequestAllArticle | ReceiveArticleList;

export const actionCreators = {
    requestAllTags: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "REQUEST_TAGS" });
        let url = APIs.tags;
        return fetch(url).then(res => res.json().then(res => {
            dispatch({ type: "RECEIVE_TAGS", tags: res as string[] });
        })).catch(res => dispatch({ type: "ERROR_TAGS", status: ContentStatus.Others }))
    },
    requestArticleList: (filter?: ArticleFilter): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (filter) {
            const url = APIs.filteredList;
            dispatch({ type: "REQUEST_SEARCH", filter: filter });
            return fetch(url, JSONRequestInit(filter)).then(res => res.json().then(res => {
                dispatch({ type: "RECEIVE_ARTICLE_LIST", articleList: res as ArticleBrief[], updatedTime: Date.now() });
                localStorage.setItem("articleList", JSON.stringify(getState().articleList));
            })).catch(res => dispatch({ type: "ERROR_ARTICLE_LIST", status: ContentStatus.Network }))
        } else {
            const url = APIs.articles;
            dispatch({ type: "REQUEST_ALL_ARTICLES" });
            return fetch(url).then(res => res.json().then(res => {
                dispatch({ type: "RECEIVE_ARTICLE_LIST", articleList: res as ArticleBrief[], updatedTime: Date.now() });
                localStorage.setItem("articleList", JSON.stringify(getState().articleList));
            })).catch(res => dispatch({ type: "ERROR_ARTICLE_LIST", status: ContentStatus.Network }))
        }

    },
    requestAllCategories: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "REQUEST_CATEGORIES" });
        let url = APIs.categories;
        fetch(url).then(res => {
            if (res.status == 200) {
                res.json().then(json => {
                    dispatch({ type: "RECEIVE_CATEGORIES", categories: json as string[] });
                });
            }
            else {
                dispatch({ type: "ERROR_CATEGORIES", status: ContentStatus.Others });
            }

        }).catch(res => dispatch({ type: "ERROR_CATEGORIES", status: ContentStatus.Network }));
    },

    expireList: () => ({ type: "EXPIRE_LIST" })

}

export const initialState: ArticleListState = {
    tags: {
        content: [],
        status: ContentStatus.Initial
    },
    categories: {
        content: [],
        status: ContentStatus.Initial
    },
    articleList: {
        content: [],
        status: ContentStatus.Initial,
        lastUpdatedTime: 0
    },

    searching: false,
    expired: false
};

export const reducer: Reducer<ArticleListState> = (state: ArticleListState, action: KnownAction) => {
    switch (action.type) {
        case "REQUEST_CATEGORIES":
            return { ...state, categories: { status: ContentStatus.Received, content: state.categories.content } };
        case "REQUEST_TAGS":
            return { ...state, tags: { status: ContentStatus.Requesting, content: state.tags.content } };
        case "RECEIVE_CATEGORIES":
            return { ...state, categories: { status: ContentStatus.Received, content: action.categories } };
        case "RECEIVE_TAGS":
            return { ...state, tags: { status: ContentStatus.Received, content: action.tags } };
        case "REQUEST_ALL_ARTICLES":
            return { ...state, articleList: { ...state.articleList, status: ContentStatus.Requesting, content: state.articleList.content } };
        case "RECEIVE_ARTICLE_LIST":
            return { ...state, expired: false, searching: false, articleList: { status: ContentStatus.Received, content: action.articleList, lastUpdatedTime: action.updatedTime } };
        case "ERROR_CATEGORIES":
            return { ...state, categories: { status: action.status, content: state.categories.content } };
        case "ERROR_TAGS":
            return { ...state, tags: { status: action.status, content: state.tags.content } };
        case "ERROR_ARTICLE_LIST":
            return { ...state, searching: false, articleList: { ...state.articleList, status: action.status, content: state.articleList.content } };
        case "REQUEST_SEARCH":
            return { ...state, searching: true, articleList: { ...state.articleList, status: ContentStatus.Requesting, content: state.articleList.content } };
        case "EXPIRE_LIST":
            return { ...state, expired: true };
        default:
            const exhausiveCheck: never = action;
    };
    return state || initialState;
};