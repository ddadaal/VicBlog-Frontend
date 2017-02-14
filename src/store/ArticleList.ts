import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs } from '../Utils';
import moment from 'moment';
import { actionCreators as listActionCreators } from './ArticleList';
import {ArticleFilter} from './ArticleListFilter';

interface SectionState<ContentType> {
    content: ContentType[],
    status: Status
}

export interface ArticleListState {
    tags: SectionState<string>,
    categories: SectionState<string>,
    articleList: SectionState<ArticleBrief> & {lastUpdatedTime : number}
    searching: boolean,
    expired: boolean
}

export interface ArticleBrief {
    id: string,
    username: string,
    submitTime: number,
    lastEditedTime: number,
    category: string,
    tags: string[]
    title: string,
    rating: number
}




export enum Status {
    Initial, 
    Requesting,
    Received, 
    Network,
    Others
}

interface ErrorTags { type: "ERROR_TAGS", status: Status }
interface ErrorCategories { type: "ERROR_CATEGORIES", status: Status }
interface ErrorArticleList { type: "ERROR_ARTICLE_LIST", status: Status }
interface RequestTags { type: "REQUEST_TAGS" }
interface ReceiveTags { type: "RECEIVE_TAGS", tags: string[] }
interface RequestCategories { type: "REQUEST_CATEGORIES" }
interface ReceiveCategories { type: "RECEIVE_CATEGORIES", categories: string[] }
interface RequestAllArticle{type: "REQUEST_ALL_ARTICLES" }
interface ReceiveArticleList { type: "RECEIVE_ARTICLE_LIST", articleList: ArticleBrief[], updatedTime: number}
interface RequestSearch { type: "REQUEST_SEARCH", filter: ArticleFilter }

interface ExpireListAction {type: "EXPIRE_LIST"}

type KnownAction =ExpireListAction| RequestSearch|  ErrorTags | ErrorCategories | ErrorArticleList | RequestTags | ReceiveTags | RequestCategories|ReceiveCategories|RequestAllArticle|ReceiveArticleList;

export const actionCreators = {
    requestAllTags: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "REQUEST_TAGS" });
        let url = APIs.tags;
        return fetch(url).then(res => res.json().then(res => {
            dispatch({ type: "RECEIVE_TAGS", tags: res as string[] });
        })).catch(res => dispatch({ type: "ERROR_TAGS", status: Status.Others }))
    },
    requestArticleList: (filter?: ArticleFilter): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let url = APIs.articles;
        if (filter) {
            url += "?";
            filter.categories.map(item => {
                url += `category=${item}&`;
            });
            filter.tags.map(item=>{
                url += `tag=${item}&`;
            });
            url+= filter.titleText ? `titleText=${filter.titleText}` : "";
            dispatch({type: "REQUEST_SEARCH", filter: filter});
        }else{
            dispatch({type: "REQUEST_ALL_ARTICLES"});
        }
        return fetch(url).then(res => res.json().then(res => {
            dispatch({ type: "RECEIVE_ARTICLE_LIST", articleList: res as ArticleBrief[], updatedTime: Date.now()  });
            localStorage.setItem("articleList",JSON.stringify(getState().articleList));
        })).catch(res => dispatch({ type: "ERROR_ARTICLE_LIST", status: Status.Network }))
    },
    requestAllCategories: ():AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type:"REQUEST_CATEGORIES"});
        let url = APIs.categories;
        fetch(url).then(res => {
            if (res.status == 200) {
                res.json().then(json => {
                    dispatch({ type: "RECEIVE_CATEGORIES", categories: json as string[] });
                });
            }
            else {
                dispatch({ type: "ERROR_CATEGORIES", status: Status.Others });
            }

        }).catch(res=>dispatch({type:"ERROR_CATEGORIES", status: Status.Network}));
    },

    expireList: ()=>({type: "EXPIRE_LIST"})

}

export const initialState : ArticleListState = {
    tags: {
        content: [],
        status: Status.Initial
    },
    categories:{
        content: [],
        status: Status.Initial
    },
    articleList:{
        content: [],
        status: Status.Initial,
        lastUpdatedTime: 0
    },

    searching: false,
    expired: false
};

export const reducer: Reducer<ArticleListState> = (state: ArticleListState, action: KnownAction)=>{
    switch(action.type){
        case "REQUEST_CATEGORIES":
            return {...state, categories: { status: Status.Received, content: state.categories.content  }};
        case "REQUEST_TAGS":
            return {...state, tags: { status: Status.Requesting, content: state.tags.content  }};
        case "RECEIVE_CATEGORIES":
            return { ...state, categories: { status: Status.Received, content: action.categories  } };
        case "RECEIVE_TAGS":
            return { ...state, tags: {status: Status.Received, content: action.tags  } };
        case "REQUEST_ALL_ARTICLES":
            return {...state, articleList:{...state.articleList,status: Status.Requesting, content: state.articleList.content}};
        case "RECEIVE_ARTICLE_LIST":
            return {...state, expired: false, searching: false, articleList:{status:Status.Received, content: action.articleList, lastUpdatedTime: action.updatedTime}};
        case "ERROR_CATEGORIES":
            return { ...state, categories:{ status: action.status, content: state.categories.content}};
        case "ERROR_TAGS":
            return { ...state, tags:{status: action.status, content: state.tags.content}};
        case "ERROR_ARTICLE_LIST":
            return { ...state, searching: false, articleList:{ ...state.articleList, status: action.status, content: state.articleList.content}};
        case "REQUEST_SEARCH":
            return {...state, searching: true, articleList:{...state.articleList, status:Status.Requesting, content: state.articleList.content}};
        case "EXPIRE_LIST":
            return {...state,expired: true};
        default:
            const exhausiveCheck: never = action;
    };
    return state || initialState;
};