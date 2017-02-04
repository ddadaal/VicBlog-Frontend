import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs } from '../Utils';

export interface ArticleListState {
    list: ArticleBrief[],
    isRequesting: boolean,
    lastUpdateTime: Date,
    filter: ArticleFilter,
    errorInfo: ErrorType
}

export interface ArticleBrief {
    id: number,
    username: number,
    submitTime: Date,
    lastEditedTime: Date,
    categories: string[],
    title: string
}

export interface ArticleFilter {
    categories: string[]
}

export enum ErrorType {
    None,
    Others
}



interface RequestArticleList { type: "REQUEST_ARTICLE_LIST", filter: ArticleFilter }
interface ReceiveArticleList { type: "RECEIVE_ARTICLE_LIST", articles: ArticleBrief[] }
interface ErrorArticleList { type: "ERROR_ARTICLE_LIST", errorInfo: ErrorType }

type KnownAction = RequestArticleList | ReceiveArticleList | ErrorArticleList;

export const actionCreators = {
    requestArticleList: (filter: ArticleFilter): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let url = APIs.articles;
        if (filter) {
            url += "?";
            filter.categories.map(item => {
                url += `Categories=${item}&`;
            });
            url = url.substring(0, url.length - 1);
        }

        let task = fetch(url).then(res => {
            if (res.status == 200) {
                res.json().then(json => {
                    dispatch({ type: "RECEIVE_ARTICLE_LIST", articles: json as ArticleBrief[] });
                });
            }
            else {
                dispatch({ type: "ERROR_ARTICLE_LIST", errorInfo: ErrorType.Others });
            }

        }).catch(res=>dispatch({type:"ERROR_ARTICLE_LIST", errorInfo: ErrorType.Others}));
        dispatch({ type: "REQUEST_ARTICLE_LIST", filter: filter });
    }
}

const initialState: ArticleListState = { list: null, isRequesting: false, lastUpdateTime: null, filter: null, errorInfo: ErrorType.None };

export const reducer: Reducer<ArticleListState> = (state: ArticleListState, action: KnownAction) => {
    switch (action.type) {
        case "REQUEST_ARTICLE_LIST":
            return { ...state, isRequesting: true, filter: action.filter, errorInfo: ErrorType.None };
        case "RECEIVE_ARTICLE_LIST":
            return { ...state, isRequesting: false, list: action.articles, lastUpdateTime: new Date(Date.now()), errorInfo: ErrorType.None, filter: state.filter };
        case "ERROR_ARTICLE_LIST":
            return { ...state, isRequesting: false, errorInfo: action.errorInfo };
        default:
            const exhausiveCheck: never = action;
    }
    return state || initialState;
}



