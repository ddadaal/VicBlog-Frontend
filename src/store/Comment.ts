import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, attachQueryString, JSONRequestInit } from '../Utils';
import { TokenOutdatedAction, TokenInvalidAction } from './User';
import fetch from 'isomorphic-fetch';
import { Map } from 'immutable';

export type CommentsState = {
    commentsOfArticles: Map<string, CommentsOfArticle>,
    content: string,
    sendStatus: SendStatus,
    deleteStatus: DeleteStatus
}

export interface CommentsOfArticle {
    comments: Comment[],
    fetchStatus: FetchStatus,
    lastUpdatedTime: number
}

export interface Comment {
    id: string,
    articleID: string,
    username: string,
    submitTime: number,
    content: string,
    replyTo: string
}

export interface SendCommentModel {
    articleID: string,
    content: string,
    replyTo: string,
}


export const enum FetchStatus {
    Initial,
    Requesting,
    Recevied,
    ArticleNotFound,
    Network,
    Others
}

export const enum SendStatus {
    Initial,
    Sending,
    Success,
    NotAuthorized,
    ArticleNotFound,
    TokenOutdated,
    Network,
    Others
}

export const enum DeleteStatus {
    Initial,
    Deleting,
    Success,
    NotAuthorized,
    CommentNotFound,
    TokenOutdated,
    Network,
    Others
}


export interface RequestAllCommentsAction { type: "REQUEST_ALL_COMMENTS", articleID: string }
export interface ErrorAllCommentsAction { type: "ERROR_ALL_COMMENTS", errorInfo: FetchStatus, articleID: string }
export interface ReceiveAllCommentsAction { type: "RECEIVE_ALL_COMMENTS", comments: Comment[], articleID: string, updatedTime: number }
export interface SendCommentAction { type: "SEND_COMMENT", model: SendCommentModel }
export interface ErrorSendingCommentAction { type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus }
export interface SuccessSendingCommentAction { type: "SUCCESS_SENDING_COMMENT", comment: Comment }
export interface DeleteComment { type: "DELETE_COMMENT", commentID: string, token: string }
export interface SuccessDeletingComment { type: "SUCCESS_DELETING_COMMENT", comment: Comment }
export interface ErrorDeletingComment { type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus }
export interface ChangeContentAction { type: "CHANGE_CONTENT", content: string }

type KnownAction = ChangeContentAction | TokenInvalidAction | ErrorDeletingComment | SuccessDeletingComment | DeleteComment | RequestAllCommentsAction | ErrorAllCommentsAction | ReceiveAllCommentsAction | SendCommentAction | ErrorSendingCommentAction | SuccessSendingCommentAction | TokenOutdatedAction;

export const actionCreators = {
    requestAllComments: (articleID: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "REQUEST_ALL_COMMENTS", articleID: articleID });
        const url = attachQueryString(APIs.comments, { articleID: articleID });
        return fetch(url).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    dispatch({ type: "RECEIVE_ALL_COMMENTS", comments: json as Comment[], articleID: articleID, updatedTime: Date.now() });
                })
            } else {
                dispatch({ type: "ERROR_ALL_COMMENTS", articleID: articleID, errorInfo: FetchStatus.Others });
            }
        }).catch(res => { dispatch({ type: "ERROR_ALL_COMMENTS", articleID: articleID, errorInfo: FetchStatus.Network }); });

    },
    sendComment: (token: string, model: SendCommentModel, callback: () => any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "SEND_COMMENT", model: model });
        const url = APIs.comments;
        return fetch(url, JSONRequestInit(model, { token: token })).then(res => {
            switch (res.status) {
                case 201:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_SENDING_COMMENT", comment: json as Comment });
                        callback();
                    });
                    break;
                case 401:
                    dispatch({ type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus.NotAuthorized });
                    dispatch({ type: "TOKEN_INVALID" });
                    break;
                case 404:
                    dispatch({ type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus.ArticleNotFound });
                    break;
                case 403:
                    dispatch({ type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus.TokenOutdated });
                    dispatch({ type: "TOKEN_OUTDATED" });
                    break;
                default:
                    dispatch({ type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus.Others });
            }
        }).catch(res => dispatch({ type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus.Network }));
    },
    deleteComment: (commentID: string, token: string, callback: () => any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: "DELETE_COMMENT", commentID: commentID, token: token });
        const url = attachQueryString(APIs.comments, { commentID: commentID });
        return fetch(url, JSONRequestInit(null, { token: token }, "DELETE")).then(res => {
            switch (res.status) {
                case 200:
                    res.json().then(json => {
                        dispatch({ type: "SUCCESS_DELETING_COMMENT", comment: json as Comment });
                        callback();
                    });
                    break;
                case 401:
                    dispatch({ type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.NotAuthorized });
                    dispatch({ type: "TOKEN_INVALID" });
                    break;
                case 403:
                    dispatch({ type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.TokenOutdated });
                    dispatch({ type: "TOKEN_OUTDATED" });
                    break;
                case 404:
                    dispatch({ type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.CommentNotFound });
                    break;
                default:
                    dispatch({ type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.Others });
            }
        }).catch(res => dispatch({ type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.Network }));
    },
    changeContent: (content: string) => ({ type: "CHANGE_CONTENT", content: content })
}

export const initialState: CommentsState = {
    commentsOfArticles: Map<string, CommentsOfArticle>(),
    content: "",
    deleteStatus: DeleteStatus.Initial,
    sendStatus: SendStatus.Initial

};

export const reducer: Reducer<CommentsState> = (state: CommentsState, action: KnownAction) => {
    switch (action.type) {
        case "REQUEST_ALL_COMMENTS":
            return { ...state, commentsOfArticles: state.commentsOfArticles.set(action.articleID, { ...state.commentsOfArticles.get(action.articleID), fetchStatus: FetchStatus.Requesting }) };
        case "RECEIVE_ALL_COMMENTS":
            return { ...state, commentsOfArticles: state.commentsOfArticles.set(action.articleID, { lastUpdatedTime: action.updatedTime, comments: action.comments, fetchStatus: FetchStatus.Recevied }) };
        case "ERROR_ALL_COMMENTS":
            return { ...state, commentsOfArticles: state.commentsOfArticles.set(action.articleID, { ...state.commentsOfArticles[action.articleID], articleID: action.articleID, fetchStatus: action.errorInfo }) };
        case "SEND_COMMENT":
            return { ...state, sendStatus: SendStatus.Sending, };
        case "SUCCESS_SENDING_COMMENT":
            return { ...state, sendStatus: SendStatus.Success };
        case "ERROR_SENDING_COMMENT":
            return { ...state, sendStatus: action.errorInfo };
        case "DELETE_COMMENT":
            return { ...state, deleteStatus: DeleteStatus.Deleting };
        case "SUCCESS_DELETING_COMMENT":
            return { ...state, deleteStatus: DeleteStatus.Success };
        case "ERROR_DELETING_COMMENT":
            return { ...state, deleteStatus: action.errorInfo };
        case "CHANGE_CONTENT":
            return { ...state, content: action.content };
        case "TOKEN_OUTDATED":
        case "TOKEN_INVALID":
            return state;
        default:
            const exhausiveCheck: never = action;
    }
    return state || initialState;
}
