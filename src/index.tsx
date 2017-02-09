import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';
import { UserState } from './store/User';
import { ArticleListState } from './store/ArticleList';
import { ApplicationState } from './store';

import configureStore from './configureStore';


const initialState:Partial<ApplicationState> = {
    user: JSON.parse(localStorage.getItem("user")) as UserState,
    articleList: JSON.parse(localStorage.getItem("articleList")) as ArticleListState
};

const store = configureStore(initialState);

const renderApp = (Component)=> {
    ReactDOM.render(
        <AppContainer>
            <Component
                store={store}
            /></AppContainer>,
        document.getElementById('app')
    );
}

renderApp(Root);

if (module.hot) {
    module.hot.accept(
        './Root',
        () => renderApp(Root)
    );
}
