import * as React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './pages/App';
import Home from './pages/Home';
import { ArticleListPage } from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import RegisterPage from './pages/RegisterPage';

export const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path="articles">
            <IndexRoute component={ArticleListPage}/>
            <Route path=":ID" component={ArticlePage}/>
        </Route>
        <Route path="register" component={RegisterPage}/>
    </Route>
);

if (module.hot) {
    module.hot.accept();
}