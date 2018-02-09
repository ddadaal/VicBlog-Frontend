import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { BlogApp } from './containers/BlogApp';
import { LocaleStore, RouterStore, UserStore } from './stores';
import { STORE_LOCALE, STORE_ROUTER,STORE_USER } from './constants/stores';
import { switches } from "./routes";
import { cn, en } from "./internationalization";

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();
const routerStore = new RouterStore(history);
const localeStore = new LocaleStore([en, cn], en.id);
const userStore = new UserStore();

const rootStores = {
  [STORE_ROUTER]: routerStore,
  [STORE_LOCALE]: localeStore,
  [STORE_USER]: userStore
};

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <BlogApp>
      <Router history={history}>
        {switches}
      </Router>
    </BlogApp>
  </Provider>,
  document.getElementById('root')
);