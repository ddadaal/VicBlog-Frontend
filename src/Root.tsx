import * as React from 'react';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router, browserHistory } from 'react-router';

import { routes } from './routes';
import { ApplicationState } from './store';
// import it here to activate hot-reloading for css
// (see index.tsx and search for module.hot)

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

class Root extends React.Component<{ store: Store<ApplicationState> }, void>{
    render() {
        const history = syncHistoryWithStore(browserHistory, this.props.store);
        return (
            <Provider store={this.props.store}>
                <Router history={history}>
                    {routes}
                </Router>
            </Provider>
        );
    }
}

if (module.hot){
    module.hot.accept();
}

export default Root;
