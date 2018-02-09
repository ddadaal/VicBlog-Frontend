import {Route, Switch} from "react-router";
import * as React from "react";
import { pages } from './pages';

export const switches = <Switch>
  {pages.map(x => <Route key={x.path} path={x.path} component={x.component}/>)}
</Switch>;