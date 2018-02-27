import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_UI } from "../../../constants/stores";
import { UiStore } from "../../../stores";
import { LocaleMessage } from "../../Common/Locale";

export interface NotLoggedInIndicatorProps {
  [STORE_UI]?: UiStore,
  className: string
}

@inject(STORE_UI)
@observer
export class NotLoggedInIndicator extends React.Component<NotLoggedInIndicatorProps, any> {

  render() {
    return <a className={this.props.className} onClick={this.props[STORE_UI].toggleLoginModalShown}>
      <LocaleMessage id={"header.navbarLogin.notLoggedInPrompt"}/>
    </a>;
  }
}