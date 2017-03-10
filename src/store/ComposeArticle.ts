import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, attachQueryString, JSONRequestInit, pathCombine } from '../Utils';
import { ExpireListAction } from './ArticleList';
import { TokenOutdatedAction} from './User';
import fetch from 'isomorphic-fetch';

export interface ComposeArticleState {
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

export const enum EditorMode {
    Others,
    New,
    Patch
}

export const enum ArticleSubmitStatus {
    Initial,
    Submitting,
    Success,
    Unauthorized,
    TokenOutdated,
    Network,
    Others
}

export interface ArticleSubmitModel {
    content: string,
    title: string,
    tags: string[],
    category: string,
    rate: number
}
export interface ArticlePatchModel {
    title: string,
    content: string,
    category: string,
    tags: string[],
    rate: number
}

export interface ArticlePatchResultModel {
    isActuallyChanged: boolean,
    article: Article
}

export interface ChangeCategoryAction { type: "CHANGE_CATEGORY", category: string }
export interface ChangeTagsAction { type: "CHANGE_TAGS", tags: string[] }
export interface ChangeTitleAction { type: "CHANGE_TITLE", title: string }
export interface ChangeContentAction { type: "CHANGE_CONTENT", content: string }
export interface ChangeRateAction { type: "CHANGE_RATE", rate: number }
export interface SubmitArticleAction { type: "SUBMIT_ARTICLE", model: ArticleSubmitModel }
export interface SuccessSubmittingAction { type: "SUCCESS_SUBMITTING", article: Article }
export interface ErrorSubmittingAction { type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus }
export interface PatchArticleAction { type: "PATCH_ARTICLE" }
export interface SuccessPatchArticleAction { type: "SUCCESS_PATCH_ARTICLE", result: Article }
export interface ErrorPatchArticleAction { type: "ERROR_PATCH_ARTICLE", errorInfo: ArticleSubmitStatus }
export interface ResetStatusAction { type: "RESET_STATUS" }
export interface SetModeAction { type: "SET_MODE", mode: EditorMode }
export interface InitiateArticleInfoAction { type: "INITIATE_ARTICLE_INFO", article: Article }

type KnownAction = InitiateArticleInfoAction | SetModeAction | PatchArticleAction | SuccessPatchArticleAction | ErrorPatchArticleAction | ExpireListAction | ResetStatusAction | ChangeRateAction | ChangeCategoryAction | ChangeRateAction | ChangeContentAction | ChangeTagsAction | ChangeTitleAction | SubmitArticleAction | SuccessSubmittingAction | ErrorSubmittingAction | TokenOutdatedAction;

export const actionCreators = {
    submitArticle: (token: string, model: ArticleSubmitModel, success?: (article: Article) => any, error?: (errorInfo: ArticleSubmitStatus) => any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "SUBMIT_ARTICLE", model: model });
        return fetch(APIs.articles, JSONRequestInit(model, { token: token })).then(res => {
            switch (res.status) {
                case 201:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_SUBMITTING", article: json as Article });
                        dispatch({ type: "EXPIRE_LIST" });
                        if (success) success(json);
                    });
                    break;
                case 401:
                    dispatch({ type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Unauthorized });
                    if (error) error(ArticleSubmitStatus.Unauthorized);
                    break;
                case 403:
                    dispatch({type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.TokenOutdated})
                    dispatch({type: "TOKEN_OUTDATED"});
                    if (error) error(ArticleSubmitStatus.TokenOutdated);
                    break;
                default:
                    dispatch({ type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Others });
                    if (error) error(ArticleSubmitStatus.Others);
            }
        }).catch(res => {
            dispatch({ type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Network });
            if (error) error(ArticleSubmitStatus.Network);
        })
    },
    patchArticle: (articleID: string, token: string, model: ArticlePatchModel, success?: (result: Article) => any, error?: (errorInfo: ArticleSubmitStatus) => any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "PATCH_ARTICLE" });
        return fetch(pathCombine(APIs.articles, articleID), JSONRequestInit(model, { token: token }, "PATCH")).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_PATCH_ARTICLE", result: json as Article });
                        dispatch({ type: "EXPIRE_LIST" });
                        if (success) success(json as Article);
                    });
                    break;
                case 401:
                    dispatch({ type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Unauthorized });
                    if (error) error(ArticleSubmitStatus.Unauthorized);
                    break;
                case 403:
                    dispatch({type: "ERROR_PATCH_ARTICLE", errorInfo: ArticleSubmitStatus.TokenOutdated})
                    if (error) error(ArticleSubmitStatus.TokenOutdated);
                    break;
                default:
                    dispatch({ type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Others });
                    if (error) error(ArticleSubmitStatus.Others);
            }
        }).catch(res => {
            dispatch({ type: "ERROR_SUBMITTING", errorInfo: ArticleSubmitStatus.Network });
            if (error) error(ArticleSubmitStatus.Network);
        })
    },
    resetStatus: () => ({ type: "RESET_STATUS" }),
    setMode: (mode: EditorMode) => ({ type: "SET_MODE", mode: mode }),
    initiateArticleInfo: (article: Article) => ({ type: "INITIATE_ARTICLE_INFO", article: article }),
    changeTitle: (title: string) => ({ type: "CHANGE_TITLE", title: title }),
    changeRate: (rate: number) => ({ type: "CHANGE_RATE", rate: rate }),
    changeContent: (content: string) => ({ type: "CHANGE_CONTENT", content: content }),
    changeTags: (tags: string[]) => ({ type: "CHANGE_TAGS", tags: tags }),
    changeCategory: (category: string) => ({ type: "CHANGE_CATEGORY", category: category })
}

export const initialState: ComposeArticleState = {
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

export const reducer: Reducer<ComposeArticleState> = (state: ComposeArticleState, action: KnownAction) => {
    switch (action.type) {
        case "CHANGE_CATEGORY":
            return { ...state, selectedCategory: action.category };
        case "CHANGE_TITLE":
            return { ...state, title: action.title };
        case "CHANGE_CONTENT":
            return { ...state, content: action.content };
        case "CHANGE_RATE":
            return { ...state, rate: action.rate };
        case "CHANGE_TAGS":
            return { ...state, selectedTags: action.tags };
        case "SUBMIT_ARTICLE":
            return { ...state, status: ArticleSubmitStatus.Submitting };
        case "SUCCESS_SUBMITTING":
            return { ...state, status: ArticleSubmitStatus.Success, resultArticle: action.article };
        case "ERROR_SUBMITTING":
            return { ...state, status: action.errorInfo };
        case "RESET_STATUS":
            return initialState;
        case "EXPIRE_LIST":
            return state;
        case "PATCH_ARTICLE":
            return { ...state, patchStatus: ArticleSubmitStatus.Submitting };
        case "SUCCESS_PATCH_ARTICLE":
            return { ...state, patchStatus: ArticleSubmitStatus.Success, resultArticle: action.result };
        case "ERROR_PATCH_ARTICLE":
            return { ...state, patchStatus: action.errorInfo };
        case "SET_MODE":
            return { ...state, mode: action.mode };
        case "INITIATE_ARTICLE_INFO":
            if (action.article) {
                return { ...state, mode: EditorMode.Patch, selectedCategory: action.article.category, selectedTags: action.article.tags, rate: action.article.rate, title: action.article.title, content: action.article.content };
            } else {
                return state;
            }

        case "TOKEN_OUTDATED":
            return state;
        default:
            const exhausiveCheck: never = action;
    }
    return state || initialState;
}









