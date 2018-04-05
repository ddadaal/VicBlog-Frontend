import React from "react";
import { observer } from "mobx-react";
import { UiStore } from "../../../stores";
import { LocaleMessage } from "../../../internationalization/components";
import { Spin } from "../../Common/Spin";
import { Inject } from "react.di";

export interface NotLoggedInIndicatorProps {
  className: string
}

@observer
export class NotLoggedInIndicator extends React.Component<NotLoggedInIndicatorProps, any> {
  @Inject uiStore: UiStore;

  render() {
    const ui = this.uiStore;
    return <a className={this.props.className} onClick={ui.toggleLoginModalShown}>
      <LocaleMessage id={"header.navbarLogin.notLoggedInPrompt"}/>
      { ui.loginModalLoading ? <Spin/> : null}
    </a>;
  }
}
