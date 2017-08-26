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

// export const routes = (
//     <div>
//         <Switch>
//         <Route path='/' component={App}/>

//         <Route path="/about" component={AboutPage}/>
//         <Redirect exact path="/about" to="/about/project"/>
//         <Route path="/about/project" component={AboutProject} />
//         <Route path="/about/me" component={AboutMe}/>
//         <Route path="/about/tech" component={AboutTech}/>
//         <Route component={NotFoundPage}/>
//         </Switch>
//         <Route exact path='/' component={Home}/>
//         <Route exact path='/articles' component={ArticleListPage}/>
//         <Route exact path='/articles/:ID' component={ArticlePage}/>
//         <Route exact path='/articles/:ID/edit' component={EditPage}/>
//         <Route exact path='/compose' component={ComposePage}/>
//     </div>
// )

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