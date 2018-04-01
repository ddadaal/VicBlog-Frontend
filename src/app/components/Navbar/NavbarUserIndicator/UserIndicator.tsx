import React from "react";
import { STORE_USER } from "../../../constants/stores";
import { UserStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import { LoggedInIndicator } from "./LoggedInIndicator";
import { NotLoggedInIndicator } from "./NotLoggedInIndicator";

interface UserIndicatorProps {
  [STORE_USER]?: UserStore,
  notLoggedInStyle: string,
  loggedInStyle: string
}

@inject(STORE_USER)
@observer
export class UserIndicator extends React.Component<UserIndicatorProps, any> {
  render() {
    return this.props[STORE_USER].loggedIn
      ? <LoggedInIndicator className={this.props.loggedInStyle}/>
      : <NotLoggedInIndicator className={this.props.notLoggedInStyle}/>;
  };
}
