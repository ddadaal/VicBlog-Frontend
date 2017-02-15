import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, attachQueryString, JSONRequestInit } from '../Utils';
import { Article } from './ArticlePage';
import { ExpireListAction } from './ArticleList';

export interface ComposeArticleState{
    selectedTags: string[],
    selectedCategory: string,
    submitStatus: ArticleSubmitStatus,
    patchStatus: ArticleSubmitStatus,
    resultArticle: Article,
    rate: number,
    mode: EditorMode,
    title: string,
    content: string
}

export enum EditorMode{
    Others,
    New,
    Patch
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
export interface ArticlePatchModel{
    token: string,
    title?: string,
    content?:string,
    category?:string,
    tags?: string[],
    rate?: number
}

export interface ArticlePatchResultModel{
    isActuallyChanged: boolean,
    article: Article
}

interface ChangeEditorInfoAction { type: "CHANGE_EDITOR_INFO", category:string, tags:string[], title:string, content:string, rate: number }
interface SubmitArticleAction { type: "SUBMIT_ARTICLE", model: SubmitArticleModel}
interface SuccessSubmittingAction { type: "SUCCESS_SUBMITTING", article: Article}
interface ChangeRateAction { type: "CHANGE_RATE", score: number} 
interface ErrorSubmittingAction{ type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus}
interface PatchArticleAction { type: "PATCH_ARTICLE" }
interface SuccessPatchArticleAction { type: "SUCCESS_PATCH_ARTICLE", result: ArticlePatchResultModel}
interface ErrorPatchArticleAction { type: "ERROR_PATCH_ARTICLE", errorInfo: ArticleSubmitStatus }
interface ResetStatusAction { type: "RESET_STATUS"}
interface SetModeAction { type: "SET_MODE",mode: EditorMode}
interface InitiateArticleInfoAction { type: "INITIATE_ARTICLE_INFO", article: Article}

type KnownAction =InitiateArticleInfoAction|SetModeAction|PatchArticleAction|SuccessPatchArticleAction|ErrorPatchArticleAction|ExpireListAction|ResetStatusAction|ChangeRateAction| ChangeEditorInfoAction |SubmitArticleAction|SuccessSubmittingAction|ErrorSubmittingAction;

export const actionCreators ={
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
    patchArticle: (articleID: string, model: ArticlePatchModel, success?:(result:ArticlePatchResultModel)=>any, error?: (errorInfo: ArticleSubmitStatus)=>any):AppThunkAction<KnownAction>=>(dispatch,getState)=>{
        dispatch({type: "PATCH_ARTICLE"});
        return fetch(`${APIs.article}${articleID}`,JSONRequestInit(model,"PATCH")).then(res=>{
            switch(res.status){
                case 200:
                    res.json().then(json=>{
                        dispatch({type: "SUCCESS_PATCH_ARTICLE", result: json as ArticlePatchResultModel});
                        dispatch({type: "EXPIRE_LIST"});
                        success ? success(json as ArticlePatchResultModel) :{};
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
    resetStatus:()=>({type: "RESET_STATUS"}),
    setMode:(mode:EditorMode)=>({type:"SET_MODE",mode: mode}),
    initiateArticleInfo: (article:Article)=>({type: "INITIATE_ARTICLE_INFO", article: article}),
    changeEditorInfo:(category?:string, tags?:string[], title?:string, content?:string, rate?:number)=>({type: "CHANGE_EDITOR_INFO", category: category, tags: tags, title: title, content: content,rate:rate})
}

export const initialState:ComposeArticleState= {
    selectedCategory: "",
    submitStatus: ArticleSubmitStatus.Initial,
    patchStatus: ArticleSubmitStatus.Initial,
    selectedTags: [],
    resultArticle: null,
    rate: 0,
    mode: EditorMode.Others,
    title: "",
    content: ""
}

export const reducer:Reducer<ComposeArticleState> = (state:ComposeArticleState, action: KnownAction)=>{
    switch(action.type){
        case "CHANGE_EDITOR_INFO":
            return {...state, 
                selectedCategory: action.category? action.category : state.selectedCategory,
                selectedTags: action.tags ? action.tags :state.selectedTags,
                content: action.content ? action.content : state.content,
                title: action.title ? action.title : state.title,
                rate: action.rate ? action.rate : state.rate
             }
        case "SUBMIT_ARTICLE":
            return {...state, status: ArticleSubmitStatus.Submitting};
        case "SUCCESS_SUBMITTING":
            return {...state, status:ArticleSubmitStatus.Success, resultArticle: action.article};
        case "ERROR_SUBMITTING":
            return {...state, status:action.errorInfo};
        case "CHANGE_RATE":
            return {...state, rate: action.score};
        case "RESET_STATUS":
            return initialState;
        case "EXPIRE_LIST":
            return state;
        case "PATCH_ARTICLE":
            return {...state, patchStatus: ArticleSubmitStatus.Submitting };
        case "SUCCESS_PATCH_ARTICLE":
            return {...state ,patchStatus: ArticleSubmitStatus.Success, resultArticle: action.result.article};
        case "ERROR_PATCH_ARTICLE":
            return {...state, patchStatus: action.errorInfo};
        case "SET_MODE":
            return {...state, mode: action.mode};
        case "INITIATE_ARTICLE_INFO":
            return { ...state, mode: EditorMode.Patch, selectedCategory: action.article.category, selectedTags: action.article.tags, rate:action.article.rating, title: action.article.title, content: action.article.content }
            
        default:
            const exhausiveCheck:never = action;
    }
    return state || initialState;
}









