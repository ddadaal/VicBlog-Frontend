import * as React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './pages/App';
import Home from './pages/Home';
import { ArticleListPage } from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import ComposePage from './pages/ComposePage';
import EditPage from './pages/EditPage';
import AboutProject from './pages/AboutProject';
import AboutPage from './pages/AboutPage';
import AboutMe from './pages/AboutMe';
import AboutTech from './pages/AboutTech';

export const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path="articles">
            <IndexRoute component={ArticleListPage} />
            <Route path=":ID">
                <IndexRoute component={ArticlePage} />
                <Route path="edit" component={EditPage} />
            </Route>
        </Route>
        <Route path="compose" component={ComposePage} />
        <Route path="about" component={AboutPage}>
            <IndexRedirect to="project"/>
            <Route path="project" component={AboutProject} />
            <Route path="me" component={AboutMe}/>
            <Route path="tech" component={AboutTech}/>
        </Route>
    </Route>
);

if (module.hot) {
    module.hot.accept();
}