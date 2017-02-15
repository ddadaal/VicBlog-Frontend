import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, attachQueryString, JSONRequestInit } from '../Utils';
import { Article } from './ArticlePage';
import { ExpireListAction } from './ArticleList';

export interface ComposeArticleState{
    selectedTags: string[],
    selectedCategory: string,
    status: ArticleSubmitStatus,
    submittedArticle: Article,
    rate: number
}

export enum ArticleSubmitStatus{
    Initial,
    Submitting,
    Success,
    Unauthorized,
    Network,
    Others
}

export interface SubmitArticleModel{
    content: string,
    title: string,
    token: string,
    tags: string[],
    category: string,
    initialRate: number
}

interface ChangeCategoryAction { type: "CHANGE_CATEGORY", category: string }
interface ChangeTagsAction { type: "CHANGE_TAGS", tags: string[]} 
interface SubmitArticleAction { type: "SUBMIT_ARTICLE", model: SubmitArticleModel}
interface SuccessSubmittingAction { type: "SUCCESS_SUBMITTING", article: Article}
interface ChangeRateAction { type: "CHANGE_RATE", score: number} 
interface ErrorSubmittingAction{ type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus}
interface ResetStatusAction { type: "RESET_STATUS"}

type KnownAction =ExpireListAction|ResetStatusAction|ChangeRateAction| ChangeCategoryAction | ChangeTagsAction|SubmitArticleAction|SuccessSubmittingAction|ErrorSubmittingAction;

export const actionCreators ={
    changeCategory: (category: string)=>({type: "CHANGE_CATEGORY", category: category}),
    changeTags: (tags: string[])=>({type:"CHANGE_TAGS", tags: tags}),
    changeRate: (score: number)=>({type: "CHANGE_RATE", score: score}),
    submitArticle: (model: SubmitArticleModel, success?:(article:Article)=>any, error?: (errorInfo: ArticleSubmitStatus)=>any):AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "SUBMIT_ARTICLE", model: model});
        return fetch(APIs.articles,JSONRequestInit(model)).then(res=>{
            switch(res.status){
                case 201:
                    res.json().then(json=>{
                        dispatch({type: "SUCCESS_SUBMITTING", article: json as Article});
                        dispatch({type: "EXPIRE_LIST"});
                        success ? success(json as Article) :{};
                    });
                    break;
                case 401:
                    dispatch({type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Unauthorized});
                    error ? error(ArticleSubmitStatus.Unauthorized) :{};
                    break;
                default:
                    dispatch({type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Others});
                    error ? error(ArticleSubmitStatus.Others) :{};
            }
        }).catch(res=>{
            dispatch({type:"ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Network});
            error ? error(ArticleSubmitStatus.Network) :{};
        })
    },
    resetStatus:()=>({type: "RESET_STATUS"})
}

export const initialState:ComposeArticleState= {
    selectedCategory: "",
    status: ArticleSubmitStatus.Initial,
    selectedTags: [],
    submittedArticle: null,
    rate: 0
}

export const reducer:Reducer<ComposeArticleState> = (state:ComposeArticleState, action: KnownAction)=>{
    switch(action.type){
        case "CHANGE_CATEGORY":
            return {...state, selectedCategory: action.category};
        case "CHANGE_TAGS":
            return {...state, selectedTags: action.tags};
        case "SUBMIT_ARTICLE":
            return {...state, status: ArticleSubmitStatus.Submitting};
        case "SUCCESS_SUBMITTING":
            return {...state, status:ArticleSubmitStatus.Success, submittedArticle: action.article};
        case "ERROR_SUBMITTING":
            return {...state, status:action.errorInfo};
        case "CHANGE_RATE":
            return {...state, rate: action.score};
        case "RESET_STATUS":
            return initialState;
        case "EXPIRE_LIST":
            return state;
        default:
            const exhausiveCheck:never = action;
    }
    return state || initialState;
}









