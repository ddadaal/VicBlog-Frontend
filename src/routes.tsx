import * as React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './pages/App';
import Home from './pages/Home';
import {ArticlesPage} from './pages/ArticlesPage';

export const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path="articles" component={ArticlesPage} />
    </Route>
);