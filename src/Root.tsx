import * as React from 'react';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, browserHistory} from 'react-router';

import { routes } from './routes';

// import it here to activate hot-reloading for css
// (see index.tsx and search for module.hot)



const Root: React.StatelessComponent<{
    children?: React.ReactChild,
    store: Store<any>
}> = function _Root(props) {
    return (
        <Provider store={props.store}>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </Provider>
    );
};

export default Root;
