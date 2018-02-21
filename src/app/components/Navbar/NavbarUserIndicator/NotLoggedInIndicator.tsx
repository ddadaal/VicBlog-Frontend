import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../../constants/stores";
import { UserStore } from "../../../stores";
import { LocaleMessage } from "../../Common/Locale";

export interface NotLoggedInIndicatorProps {
  [STORE_USER]?: UserStore,
  className: string
}

@inject(STORE_USER)
@observer
export class NotLoggedInIndicator extends React.Component<NotLoggedInIndicatorProps, any> {

  render() {
    return <a className={this.props.className} onClick={this.props[STORE_USER].toggleLoginModalShown}>
      <LocaleMessage id={"header.navbarLogin.notLoggedInPrompt"}/>
    </a>;
  }
}