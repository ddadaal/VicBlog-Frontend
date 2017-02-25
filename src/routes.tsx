import * as React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './pages/App';
import Home from './pages/Home';
import { ArticleListPage } from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import { TestPage} from './pages/Test';
import {ComposePage} from './pages/ComposePage';
import EditPage from './pages/EditPage';
import  AboutPage from './pages/AboutPage';

export const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path="articles">
            <IndexRoute component={ArticleListPage}/>
            <Route path=":ID">
                <IndexRoute component={ArticlePage}/>
                <Route path="edit" component={EditPage}/>
                </Route>
        </Route>
        <Route path="compose" component={ComposePage}/>
        <Route path="test" component={TestPage}/>
        <Route path="about" component={AboutPage}/>
    </Route>
);

if (module.hot) {
    module.hot.accept();
}