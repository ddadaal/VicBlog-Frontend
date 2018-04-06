import { Redirect, Route, RouteComponentProps } from "react-router";
import { AsyncComponent } from "./AsyncComponent";
import React from "react";

export abstract class PageConfig {
  path: string;
  exact: boolean = true;

  constructor(config) {
    Object.assign(this, config);
  }

  abstract construct();

}

export class RedirectPageConfig extends PageConfig{
  path: string;
  to: string;

  construct() {
    return <Redirect exact={this.exact} key={this.path} to={this.to} path={this.path}/>
  }

}

export class AsyncPageConfig extends PageConfig{
  render: (props: RouteComponentProps<any>) => Promise<JSX.Element>;

  construct() {
    return <Route
      exact={this.exact}
      key={this.path}
      path={this.path}
      render={props => <AsyncComponent render={this.render} props={props}/>}/>
  }
}
