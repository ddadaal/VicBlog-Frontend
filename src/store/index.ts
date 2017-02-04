import { Action, Reducer } from 'redux';
import * as User from './User';
import * as ArticleList from './ArticleList';
import * as ArticlePanel from './ArticlePanel';

// The top-level state object
export interface ApplicationState {
    user: User.UserState,
    articleList: ArticleList.ArticleListState,
    articlePanel: ArticlePanel.ArticlePanelState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    user: User.reducer,
    articleList: ArticleList.reducer,
    articlePanel: ArticlePanel.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}