import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UserState } from './store/User';
import {
    createStore, applyMiddleware, compose, combineReducers, GenericStoreEnhancer
} from 'redux';
import { ArticleListState } from './store/ArticleList';
import { ApplicationState, initialState } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import * as Redux from 'react-redux';
import thunkMiddleWare from 'redux-thunk';
import * as Store from './store';
import { createLogger } from 'redux-logger';
import { routes } from './routes';


const history = createHistory();
const middleware = [
    thunkMiddleWare,
    routerMiddleware(history)
].concat(process.env.__DEV__ ? [createLogger({ collapsed: true })] : []);


const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators or immutablejs support
        }) : compose;

function buildRootReducer(allReducers) {
    return combineReducers<Store.ApplicationState>({
        routing: routerReducer,
        ...allReducers
    });
}

const store = createStore(buildRootReducer(Store.reducers), initialState, composeEnhancers(
    applyMiddleware(...middleware),
)) as Redux.Store<Store.ApplicationState>;

if (module.hot) {
    module.hot.accept('./store', () => {
        const nextRootReducer = require<typeof Store>('./store');
        store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
    });
}

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {routes}
            </ConnectedRouter>
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);
