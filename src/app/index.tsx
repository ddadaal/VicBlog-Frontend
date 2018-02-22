import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { LocaleStore, RouterStore, UserStore } from './stores';
import { STORE_ARTICLE_LIST, STORE_LOCALE, STORE_ROUTER, STORE_USER } from './constants/stores';
import { switches } from "./routes/routes";
import { cn, en } from "./internationalization";
import { ArticleListStore } from "./stores/ArticleListStore";

// enable MobX strict mode
useStrict(true);


let stores;

function render() {
  const Root = require("./root").BlogApp;
  // render react DOM
  ReactDOM.render(
    <Provider {...stores} >
      <Root>
        <Router history={history}>
          {switches}
        </Router>
      </Root>
    </Provider>,
    document.getElementById('root')
  );
}

const history = createBrowserHistory();
const routerStore = new RouterStore(history);

async function resetStore() {
  const fallbackLanguage = cn.id;
  const userLanguage = window ? window.navigator.language : en.id;
  const userStore = new UserStore();
  const articleListStore = new ArticleListStore();
  const localeStore = await LocaleStore.init([en, cn], userLanguage, fallbackLanguage);

  stores = {
    [STORE_ROUTER]: routerStore,
    [STORE_LOCALE]: localeStore,
    [STORE_USER]: userStore,
    [STORE_ARTICLE_LIST]: articleListStore
  };
}
// prepare MobX stores

resetStore().then(render);

