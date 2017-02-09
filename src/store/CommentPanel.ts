import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs, attachQueryString } from '../Utils';

export interface CommentPanelState {
    comments: Comment[],
    errorInfo: ErrorType,
    articleID: number,
    isRequesting: boolean,
    isSending: boolean
}

export interface Comment {
    id: number,
    articleID: number,
    username: string,
    submitTime: number,
    content: string,
    replyTo: number
}

export interface SendCommentModel {
    articleID: number,
    content: string,
    replyTo: number,
    token: string
}

enum ErrorType {
    None,
    NotAuthorized,
    ArticleIDNotFound,
    Others,
    Network
}

interface RequestAllCommentsAction { type: "REQUEST_ALL_COMMENTS", articleID: number }
interface ErrorAllCommentsAction { type: "ERROR_ALL_COMMENTS", errorInfo: ErrorType }
interface ReceiveAllCommentsAction { type: "RECEIVE_ALL_COMMENTS", comments: Comment[], articleID: number }
interface SendCommentAction { type: "SEND_COMMENT", model: SendCommentModel }
interface ErrorSendingCommentAction { type: "ERROR_SENDING_COMMENT", errorInfo: ErrorType }
interface SuccessSendingCommentAction { type: "SUCCESS_SENDING_COMMENT", comment: Comment }

type KnownAction = RequestAllCommentsAction |  ErrorAllCommentsAction  | ReceiveAllCommentsAction | SendCommentAction | ErrorSendingCommentAction | SuccessSendingCommentAction;

export const actionCreators = {
    requestAllComments: (articleID: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type:"REQUEST_ALL_COMMENTS",articleID: articleID});
        const url = attachQueryString(APIs.comments, { articleID: articleID });
        fetch(url).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    dispatch({ type: "RECEIVE_ALL_COMMENTS", comments: json as Comment[], articleID: articleID });
                })
            } else {
                dispatch({ type: "ERROR_ALL_COMMENTS", errorInfo: ErrorType.Others });
            }
        }).catch(res => { dispatch({ type: "ERROR_ALL_COMMENTS", errorInfo: ErrorType.Network }); });

    },
    sendComment: (model: SendCommentModel): AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "SEND_COMMENT", model: model});
        const url = APIs.comments;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(model)
        }).then(res=>{
            switch(res.status){
                case 201:
                    res.json().then(json=>dispatch({type:"SUCCESS_SENDING_COMMENT", comment: json as Comment  }));
                    break;
                case 401:
                    dispatch({type: "ERROR_SENDING_COMMENT", errorInfo: ErrorType.NotAuthorized});
                    break;
                case 404:
                    dispatch({type: "ERROR_SENDING_COMMENT", errorInfo: ErrorType.ArticleIDNotFound});
                    break;
                default:
                    dispatch({type:"ERROR_SENDING_COMMENT", errorInfo: ErrorType.Others});
            }
            
        }).catch(res=>dispatch({type: "ERROR_SENDING_COMMENT", errorInfo: ErrorType.Network}));
    }
    
}

export const initialState:CommentPanelState = {
    articleID: -1,
    comments: [],
    isRequesting: false,
    isSending: false,
    errorInfo: ErrorType.None,
}

export const reducer: Reducer<CommentPanelState>= (state:CommentPanelState, action:KnownAction)=>{
    switch(action.type){
        case "REQUEST_ALL_COMMENTS":
            return { ...state, articleID: action.articleID, isRequesting: true, errorInfo: ErrorType.None };
        case "RECEIVE_ALL_COMMENTS":
            return { ...state, articleID: action.articleID, isRequesting: false, comments: action.comments, errorInfo: ErrorType.None };
        case "ERROR_ALL_COMMENTS":
            return { ...state, isRequesting: false, errorInfo: action.errorInfo };
        case "SEND_COMMENT":
            return { ...state, isSending: true, errorInfo: ErrorType.None, articleID: action.model.articleID };
        case "SUCCESS_SENDING_COMMENT":
            return { ...state, isSending: false, errorInfo: ErrorType.None };
        case "ERROR_SENDING_COMMENT":
            return { ...state, isSending: false, errorInfo: action.errorInfo };
        default:
            const exhausiveCheck: never = action;
    }
    return state || initialState;
}
