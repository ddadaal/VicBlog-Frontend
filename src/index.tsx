import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UserState } from './store/User';
import { ArticleListState } from './store/ArticleList';
import { ApplicationState, initialState } from './store';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { routes } from './routes';



const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Router history={history} children={routes} />
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);

// if (module.hot) {
//     module.hot.accept(
//         './Root',
//         () => renderApp(Root)
//     );
// }
