import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, attachQueryString, JSONRequestInit } from '../Utils';
import fetch from 'isomorphic-fetch';

export interface CommentPanelState {
    comments: Comment[],
    contentStatus: ContentStatus,
    sendStatus: SendStatus,
    deleteStatus: DeleteStatus,
    articleID: string,
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


export enum ContentStatus{
    Initial,
    Requesting,
    Recevied, 
    ArticleNotFound,
    Network,
    Others
}

export enum SendStatus {
    Initial,
    Sending,
    Success,
    NotAuthorized,
    ArticleNotFound,
    Network,
    Others
}

export enum DeleteStatus {
    Initial,
    Deleting,
    Success,
    NotAuthorized,
    CommentNotFound,
    Network,
    Others
}


interface RequestAllCommentsAction { type: "REQUEST_ALL_COMMENTS", articleID: string }
interface ErrorAllCommentsAction { type: "ERROR_ALL_COMMENTS", errorInfo: ContentStatus }
interface ReceiveAllCommentsAction { type: "RECEIVE_ALL_COMMENTS", comments: Comment[], articleID: string }
interface SendCommentAction { type: "SEND_COMMENT", model: SendCommentModel }
interface ErrorSendingCommentAction { type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus }
interface SuccessSendingCommentAction { type: "SUCCESS_SENDING_COMMENT", comment: Comment }
interface DeleteComment { type:"DELETE_COMMENT", commentID: string, token: string}
interface SuccessDeletingComment { type: "SUCCESS_DELETING_COMMENT", comment: Comment }
interface ErrorDeletingComment { type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus}

type KnownAction =ErrorDeletingComment|SuccessDeletingComment |DeleteComment|RequestAllCommentsAction |  ErrorAllCommentsAction  | ReceiveAllCommentsAction | SendCommentAction | ErrorSendingCommentAction | SuccessSendingCommentAction;

export const actionCreators = {
    requestAllComments: (articleID: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type:"REQUEST_ALL_COMMENTS",articleID: articleID});
        const url = attachQueryString(APIs.comments, { articleID: articleID });
        return fetch(url).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    dispatch({ type: "RECEIVE_ALL_COMMENTS", comments: json as Comment[], articleID: articleID });
                })
            } else {
                dispatch({ type: "ERROR_ALL_COMMENTS", errorInfo: ContentStatus.Others });
            }
        }).catch(res => { dispatch({ type: "ERROR_ALL_COMMENTS", errorInfo: ContentStatus.Network }); });

    },
    sendComment: (token:string, model: SendCommentModel, callback: ()=>any): AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "SEND_COMMENT", model: model});
        const url = APIs.comments;
        return fetch(url, JSONRequestInit(model, {token: token})).then(res=>{
            switch(res.status){
                case 201:
                    res.json().then(json=>{
                        dispatch({type:"SUCCESS_SENDING_COMMENT", comment: json as Comment  });
                        callback();
                    });
                    break;
                case 401:
                    dispatch({type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus.NotAuthorized});
                    break;
                case 404:
                    dispatch({type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus.ArticleNotFound});
                    break;
                default:
                    dispatch({type:"ERROR_SENDING_COMMENT", errorInfo: SendStatus.Others});
            }           
        }).catch(res=>dispatch({type: "ERROR_SENDING_COMMENT", errorInfo: SendStatus.Network}));
    },
    deleteComment: (commentID: string, token: string, callback: ()=>any ) : AppThunkAction<KnownAction> =>(dispatch, getState)=>{
        dispatch({type:"DELETE_COMMENT", commentID: commentID, token: token});
        const url = attachQueryString(APIs.comments,{commentID: commentID});
        return fetch(url,JSONRequestInit(null,{token: token},"DELETE")).then(res=>{
            switch(res.status){
                case 200:
                    res.json().then(json=>{
                        dispatch({type: "SUCCESS_DELETING_COMMENT",comment: json as Comment });
                        callback();
                    });
                    break;
                case 401:
                    dispatch({type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.NotAuthorized});
                    break;
                case 404:
                    dispatch({type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.CommentNotFound});
                    break;
                default:
                    dispatch({type:"ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.Others});
            }
        }).catch(res=>dispatch({type: "ERROR_DELETING_COMMENT", errorInfo: DeleteStatus.Network}));
    }
    
}

export const initialState:CommentPanelState = {
    articleID: "",
    comments: [],
    contentStatus: ContentStatus.Initial,
    deleteStatus: DeleteStatus.Initial,
    sendStatus: SendStatus.Initial
}

export const reducer: Reducer<CommentPanelState>= (state:CommentPanelState, action:KnownAction)=>{
    switch(action.type){
        case "REQUEST_ALL_COMMENTS":
            return { ...state, articleID: action.articleID, contentStatus: ContentStatus.Requesting };
        case "RECEIVE_ALL_COMMENTS":
            return { ...state, articleID: action.articleID, comments: action.comments, contentStatus: ContentStatus.Recevied };
        case "ERROR_ALL_COMMENTS":
            return { ...state, contentStatus: action.errorInfo };
        case "SEND_COMMENT":
            return { ...state, sendStatus: SendStatus.Sending, articleID: action.model.articleID };
        case "SUCCESS_SENDING_COMMENT":
            return { ...state, sendStatus: SendStatus.Success };
        case "ERROR_SENDING_COMMENT":
            return { ...state, sendStatus: action.errorInfo };
        case "DELETE_COMMENT":
            return {...state, deleteStatus: DeleteStatus.Deleting};
        case "SUCCESS_DELETING_COMMENT":
            return {...state, deleteStatus: DeleteStatus.Success};
        case "ERROR_DELETING_COMMENT":
            return {...state, deleteStatus: action.errorInfo};
        default:
            const exhausiveCheck: never = action;
    }
    return state || initialState;
}
