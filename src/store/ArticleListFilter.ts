import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { APIs } from '../Utils';
import moment from 'moment';
import { actionCreators as listActionCreators } from './ArticleList';

export interface ArticleFilterState {
    filter: ArticleFilter
}

export const enum ArticleBriefListOrder {
    NotSpecified,
    SubmitEarliestToLatest,
    SubmitLatestToEarliest,
    LastEditedEarliestToLatest,
    LastEditedLatestToEarliest,
    RankHighestToLowest,
    RankLowestToHighest
}

export const orderDescription = {
    [ArticleBriefListOrder.NotSpecified]: "Arbitrary",
    [ArticleBriefListOrder.SubmitEarliestToLatest]: "Submit Time Earliest To Latest",
    [ArticleBriefListOrder.SubmitLatestToEarliest]: "Submit Time Latest To Earliest",
    [ArticleBriefListOrder.LastEditedEarliestToLatest]: "Last Edited Earliest To Latest",
    [ArticleBriefListOrder.LastEditedLatestToEarliest]: "Last Edited Latest To Earliest",
    [ArticleBriefListOrder.RankHighestToLowest]: "Rate Highest To Lowest",
    [ArticleBriefListOrder.RankLowestToHighest]: "Rate Lowest To Highest"
}


export interface ArticleFilter {
    categories: string[],
    titleText: string,
    tags: string[],
    order: ArticleBriefListOrder
}



export interface ChangeFilterAction { type: "CHANGE_FILTER", filter: ArticleFilter }

type KnownAction = ChangeFilterAction;

export const actionCreators = {
    changeFilter: (filter: ArticleFilter) => ({ type: "CHANGE_FILTER", filter: filter }),
}

const initialState: ArticleFilterState = {
    filter: {
        categories: [],
        tags: [],
        titleText: "",
        order: ArticleBriefListOrder.SubmitLatestToEarliest
    }

}

export const reducer: Reducer<ArticleFilterState> = (state: ArticleFilterState, action: KnownAction) => {
    switch (action.type) {
        case "CHANGE_FILTER":
            return { filter: action.filter };

    }
    return state || initialState;

}

