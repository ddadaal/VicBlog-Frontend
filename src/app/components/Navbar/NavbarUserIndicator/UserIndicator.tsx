import React from "react";
import { UserStore } from "../../../stores";
import { observer } from "mobx-react";
import { LoggedInIndicator } from "./LoggedInIndicator";
import { NotLoggedInIndicator } from "./NotLoggedInIndicator";
import { Inject } from "react.di";

interface UserIndicatorProps {
  notLoggedInStyle: string;
  loggedInStyle: string;
}

@observer
export class UserIndicator extends React.Component<UserIndicatorProps, any> {

  @Inject userStore: UserStore;

  render() {
    return this.userStore.loggedIn
      ? <LoggedInIndicator className={this.props.loggedInStyle}/>
      : <NotLoggedInIndicator className={this.props.notLoggedInStyle}/>;
  };
}
