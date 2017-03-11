import {
    createStore, applyMiddleware, compose,combineReducers,GenericStoreEnhancer
} from 'redux';

import createSagaMiddleware from 'redux-saga'

import * as Redux from 'react-redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleWare from 'redux-thunk';
import * as Store from './store';


const createLogger = require('redux-logger');
const middleware = [
    thunkMiddleWare,
].concat(process.env.__DEV__ ? [createLogger({ collapsed: true })] : []);

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators or immutablejs support
      }) : compose;

export default function configureStore(initialState) {
    const store = createStore(buildRootReducer(Store.reducers), initialState, composeEnhancers(
        applyMiddleware(...middleware),
    )) as Redux.Store<Store.ApplicationState>;

    if (module.hot) {
        module.hot.accept('./store', () => {
            const nextRootReducer = require<typeof Store>('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
};


function buildRootReducer(allReducers) {
    return combineReducers<Store.ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }));
}
