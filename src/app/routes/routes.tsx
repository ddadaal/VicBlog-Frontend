import { Route, Switch } from "react-router";
import * as React from "react";
import { pageConfigs } from '../pages';
import { AsyncComponent } from "./AsyncComponent";

export const switches = <Switch>
  {pageConfigs.map(x => <Route
    exact={x.exact}
    key={x.path}
    path={x.path}
    render={props => <AsyncComponent render={x.render} props={props}/>}/>)}
</Switch>;