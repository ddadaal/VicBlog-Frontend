import { Action, Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as User from './User';
import * as ArticleList from './ArticleList';
import * as ArticlePage from './ArticlePage';
import * as Comments from './Comment';
import * as Rate from './Rating';
import * as ArticleFilter from './ArticleListFilter';
import * as ComposeArticle from './ComposeArticle';
import * as AboutPage from './AboutPage';
import * as PV from './PV';
import * as Version from './Version';

// The top-level state object
export interface ApplicationState {
    user: User.UserState,
    articleList: ArticleList.ArticleListState,
    articlePage: ArticlePage.ArticlePagesState,
    comments: Comments.CommentsState,
    
    rate: Rate.RatingState,
    articleFilter: ArticleFilter.ArticleFilterState,
    composeArticle: ComposeArticle.ComposeArticleState,
    aboutPage: AboutPage.AboutPageState,
    pv: PV.PVState,
    version: Version.VersionState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    user: User.reducer,
    articleList: ArticleList.reducer,
    articlePage: ArticlePage.reducer,
    comments: Comments.reducer,
    rate: Rate.reducer,
    articleFilter: ArticleFilter.reducer,
    composeArticle: ComposeArticle.reducer,
    aboutPage: AboutPage.reducer,
    pv: PV.reducer,
    version: Version.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}