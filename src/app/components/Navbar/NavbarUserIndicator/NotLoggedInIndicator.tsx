import React from "react";
import { inject, observer } from "mobx-react";
import { STORE_UI } from "../../../constants/stores";
import { UiStore } from "../../../stores";
import { LocaleMessage } from "../../../internationalization/components";
import { Spin } from "../../Common/Spin";

export interface NotLoggedInIndicatorProps {
  [STORE_UI]?: UiStore,
  className: string
}

@inject(STORE_UI)
@observer
export class NotLoggedInIndicator extends React.Component<NotLoggedInIndicatorProps, any> {

  render() {
    const ui = this.props[STORE_UI];
    return <a className={this.props.className} onClick={ui.toggleLoginModalShown}>
      <LocaleMessage id={"header.navbarLogin.notLoggedInPrompt"}/>
      { ui.loginModalLoading ? <Spin/> : null}
    </a>;
  }
}
