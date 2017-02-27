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
    aboutMe: SectionState,
    aboutTech: SectionState
}

interface FetchAboutProjectAction { type: "FETCH_ABOUT_PROJECT" }
interface SuccessAboutProjectAction { type: "SUCCESS_ABOUT_PROECT", content: string}
interface ErrorAboutProjectAction { type: "ERROR_ABOUT_PROJECT"}
interface FetchAboutMeAction { type: "FETCH_ABOUT_ME" }
interface SuccessAboutMeAction { type: "SUCCESS_ABOUT_ME", content: string}
interface ErrorAboutMeAction { type: "ERROR_ABOUT_ME"}
interface FetchAboutTechAction { type: "FETCH_ABOUT_TECH" }
interface SuccessAboutTechAction { type: "SUCCESS_ABOUT_TECH", content: string}
interface ErrorAboutTechAction { type: "ERROR_ABOUT_TECH"}

type KnownAction = FetchAboutProjectAction | SuccessAboutProjectAction| ErrorAboutProjectAction|FetchAboutMeAction|SuccessAboutMeAction|ErrorAboutMeAction|FetchAboutTechAction|SuccessAboutTechAction|ErrorAboutTechAction;

export const actionCreators = {
    fetchAboutProject: ():AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "FETCH_ABOUT_PROJECT"});
        fetch(APIs.about.project).then(res=>res.text()).then(value=>{
            dispatch({type: "SUCCESS_ABOUT_PROECT", content: value});
        }).catch(res=>dispatch({type: "ERROR_ABOUT_PROJECT"}))
    },
    fetchAboutMe: ():AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "FETCH_ABOUT_ME"});
        fetch(APIs.about.me).then(res=>res.text()).then(value=>{
            dispatch({type: "SUCCESS_ABOUT_ME", content: value});
        }).catch(res=>dispatch({type: "ERROR_ABOUT_ME"}))
    },
    fetchAboutTech: ():AppThunkAction<KnownAction> => (dispatch, getState)=>{
        dispatch({type: "FETCH_ABOUT_TECH"});
        fetch(APIs.about.tech).then(res=>res.text()).then(value=>{
            dispatch({type: "SUCCESS_ABOUT_TECH", content: value});
        }).catch(res=>dispatch({type: "ERROR_ABOUT_TECH"}))
    },
}

const initialState = {
    aboutProject: { loading: false, error: false, content: "", loaded: false},
    aboutMe: { loading: false, error: false, content: "", loaded: false},
    aboutTech: {loading: false, error: false, content:"", loaded: false}
}

export const reducer: Reducer<AboutPageState> = (state: AboutPageState, action:KnownAction)=>{
    switch(action.type){
        case "FETCH_ABOUT_PROJECT":
            return {...state, aboutProject: { loading: true, error: false, content: state.aboutProject.content, loaded: false }};
        case "ERROR_ABOUT_PROJECT":
            return { ...state, aboutProject: {loading: false, error: true, content: state.aboutProject.content, loaded: false}};
        case "SUCCESS_ABOUT_PROECT":
            return {...state, aboutProject:{loading: false, error: false, content:action.content, loaded: true}};
        case "FETCH_ABOUT_ME":
            return {...state, aboutMe: { loading: true, error: false, content: state.aboutMe.content, loaded: false }};
        case "ERROR_ABOUT_ME":
            return { ...state, aboutMe: {loading: false, error: true, content: state.aboutMe.content, loaded: false}};
        case "SUCCESS_ABOUT_ME":
            return {...state, aboutMe:{loading: false, error: false, content:action.content, loaded: true}};
        case "FETCH_ABOUT_TECH":
            return {...state, aboutTech: { loading: true, error: false, content: state.aboutMe.content, loaded: false }};
        case "ERROR_ABOUT_TECH":
            return { ...state, aboutTech: {loading: false, error: true, content: state.aboutMe.content, loaded: false}};
        case "SUCCESS_ABOUT_TECH":
            return {...state, aboutTech:{loading: false, error: false, content:action.content, loaded: true}};
        default:
            const exhausiveCheck:never = action;
    }
    return state || initialState;
}
