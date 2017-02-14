import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs } from '../Utils';
import moment from 'moment';
import { actionCreators as listActionCreators } from './ArticleList';

export interface ArticleFilterState {
    filter: ArticleFilter
}

export interface ArticleFilter {
    categories: string[],
    titleText: string,
    tags: string[]
}



interface ChangeFilterAction { type: "CHANGE_FILTER", filter: ArticleFilter }

type KnownAction = ChangeFilterAction;

export const actionCreators = {
    changeFilter: (filter: ArticleFilter) => ({ type: "CHANGE_FILTER", filter: filter }),
}

const initialState: ArticleFilterState = {
    filter: {
        categories: [],
        tags: [],
        titleText: ""
    }

}

export const reducer: Reducer<ArticleFilterState> = (state: ArticleFilterState, action: KnownAction) => {
    switch (action.type) {
        case "CHANGE_FILTER":
            return { filter: action.filter };

    }
    return state || initialState;

}

