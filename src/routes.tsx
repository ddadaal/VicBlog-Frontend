import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
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
import NotFoundPage from './pages/404';


const renderAppWith = (...components)=>(match)=>{
    return  <App>
        {components.map(X=><X match/>)}
        </App>;
};

export const routes = (
    <div>
        <Switch>
        <Route exact path='/' render={renderAppWith(Home)}/>
        <Redirect exact path="/about" to="/about/project"/>
        <Route exact path="/about/project" render={renderAppWith(AboutProject)} />
        <Route exact path="/about/me" render={renderAppWith(AboutMe)}/>
        <Route exact path="/about/tech" render={renderAppWith(AboutTech)}/>
        <Route exact path='/articles' render={renderAppWith(ArticleListPage)}/>
        <Route exact path='/articles/:ID' component={ArticlePage}/>
        <Route exact path='/articles/:ID/edit' component={EditPage}/>
        <Route exact path='/compose' render={renderAppWith(ComposePage)}/>
        <Route render={renderAppWith(NotFoundPage)}/>
        </Switch>
    </div>
)

// export const routes = (
//     <div>
//     <Route path='/' component={App}>
//         <IndexRoute component={Home} />
//         <Route path="articles">
//             <IndexRoute component={ArticleListPage} />
//             <Route path=":ID">
//                 <IndexRoute component={ArticlePage} />
//                 <Route path="edit" component={EditPage} />
//             </Route>
//         </Route>
//         <Route path="compose" component={ComposePage} />
//         <Route path="about" component={AboutPage}>
//             <Redirect to="project"/>
//             <Route path="project" component={AboutProject} />
//             <Route path="me" component={AboutMe}/>
//             <Route path="tech" component={AboutTech}/>
//         </Route>
//         <Route path="*" component={NotFoundPage}/>
//     </Route>
//     </div>
// );

if (module.hot) {
    module.hot.accept();
}
