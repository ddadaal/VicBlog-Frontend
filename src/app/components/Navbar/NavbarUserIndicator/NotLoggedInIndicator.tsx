import * as React from "react";
import { observer, inject } from "mobx-react";
import { STORE_LOCALE, STORE_USER } from "../../../constants/stores";
import { LocaleStore, UserStore } from "../../../stores";
import { LocaleMessage } from "../../../internationalization";

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