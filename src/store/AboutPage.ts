import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs } from '../Utils';
import fetch from 'isomorphic-fetch';

interface SectionState{
    loading: boolean,
    error: boolean,
    loaded: boolean,
    content: string
}

export interface AboutPageState {
    aboutProject: SectionState,
    aboutMe: SectionState
}

interface RequestAboutProjectAction { type: "REQUEST_ABOUT_PROJECT" }
interface SuccessAboutProjectAction { type: "SUCCESS_ABOUT_PROECT", content: string}
interface ErrorAboutProjectAction { type: "ERROR_ABOUT_PROJECT"}
interface RequestAboutMeAction { type: "REQUEST_ABOUT_ME" }
interface SuccessAboutMeAction { type: "SUCCESS_ABOUT_ME", content: string}
interface ErrorAboutMeAction { type: "ERROR_ABOUT_ME"}

type KnownAction = RequestAboutProjectAction | SuccessAboutProjectAction| ErrorAboutProjectAction|RequestAboutMeAction|SuccessAboutMeAction|ErrorAboutMeAction;

export const actionCreators = {
    requestAboutProject: ():AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "REQUEST_ABOUT_PROJECT"});
        fetch(APIs.about).then(res=>res.text()).then(value=>{
            dispatch({type: "SUCCESS_ABOUT_PROECT", content: value});
        }).catch(res=>dispatch({type: "ERROR_ABOUT_PROJECT"}))
    },
    requestAboutMe: ():AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "REQUEST_ABOUT_ME"});
        fetch(APIs.contact).then(res=>res.text()).then(value=>{
            dispatch({type: "SUCCESS_ABOUT_ME", content: value});
        }).catch(res=>dispatch({type: "ERROR_ABOUT_ME"}))
    },
}

const initialState = {
    aboutProject: { loading: false, error: false, content: "", loaded: false},
    aboutMe: { loading: false, error: false, content: "", loaded: false}
}

export const reducer: Reducer<AboutPageState> = (state: AboutPageState, action:KnownAction)=>{
    switch(action.type){
        case "REQUEST_ABOUT_PROJECT":
            return {...state, aboutProject: { loading: true, error: false, content: state.aboutProject.content, loaded: false }};
        case "ERROR_ABOUT_PROJECT":
            return { ...state, aboutProject: {loading: false, error: true, content: state.aboutProject.content, loaded: false}};
        case "SUCCESS_ABOUT_PROECT":
            return {...state, aboutProject:{loading: false, error: false, content:action.content, loaded: true}};
        case "REQUEST_ABOUT_ME":
            return {...state, aboutMe: { loading: true, error: false, content: state.aboutMe.content, loaded: false }};
        case "ERROR_ABOUT_ME":
            return { ...state, aboutMe: {loading: false, error: true, content: state.aboutMe.content, loaded: false}};
        case "SUCCESS_ABOUT_ME":
            return {...state, aboutMe:{loading: false, error: false, content:action.content, loaded: true}};
        default:
            const exhausiveCheck:never = action;
    }
    return state || initialState;
}
