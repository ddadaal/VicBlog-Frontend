import React from "react";
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { ArticleFilterStore, ArticleListStore, ArticleStore, RouterStore, UiStore, UserStore } from './stores';
import {
  STORE_ARTICLE, STORE_ARTICLE_FILTER,
  STORE_ARTICLE_LIST,
  STORE_LOCALE,
  STORE_ROUTER,
  STORE_UI,
  STORE_USER
} from './constants/stores';
import { switches } from "./routes/routes";
import { LocaleStore } from "./internationalization";

// enable MobX strict mode
configure( { enforceActions: true});


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
  const userStore = new UserStore();
  const articleListStore = new ArticleListStore();
  const articleStore = new ArticleStore();
  const uiStore = new UiStore();
  const localeStore = new LocaleStore();
  const articleFilterStore = new ArticleFilterStore(routerStore);
  await localeStore.init();


  stores = {
    [STORE_ROUTER]: routerStore,
    [STORE_LOCALE]: localeStore,
    [STORE_USER]: userStore,
    [STORE_ARTICLE_LIST]: articleListStore,
    [STORE_ARTICLE]: articleStore,
    [STORE_UI]: uiStore,
    [STORE_ARTICLE_FILTER]: articleFilterStore
  };
}
// prepare MobX stores

resetStore().then(render);

