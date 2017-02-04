import * as React from 'react';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, browserHistory} from 'react-router';

import { routes } from './routes';

// import it here to activate hot-reloading for css
// (see index.tsx and search for module.hot)

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'



const Root: React.StatelessComponent<{
    children?: React.ReactChild,
    store: Store<any>
}> = function _Root(props) {
    const history = syncHistoryWithStore(browserHistory, props.store );
    return (
        <Provider store={props.store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>
    );
};

export default Root;
