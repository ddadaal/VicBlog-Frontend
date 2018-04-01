import React from "react";
import style from '../../style';
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../../constants/stores";
import { UserStore } from "../../../stores";
import { LocaleMessage } from "../../../internationalization/components";

export interface LoggedInIndicatorProps {
  [STORE_USER]? :UserStore,
  className: string,
}

@inject(STORE_USER)
@observer
export class LoggedInIndicator extends React.Component<LoggedInIndicatorProps, any> {
  render() {
    const user = this.props[STORE_USER];
    return <div className={this.props.className}>
      <button className={style("w3-button")}>
        <LocaleMessage id={"header.navbarLogin.loggedInPrompt"} replacements={{username: user.user.name}}/>
      </button>
      <div className={style("w3-dropdown-content","w3-bar-block","w3-card-4")}>
        {user.isAdmin
          ? <a className={style("w3-bar-item","w3-button")}>
            <LocaleMessage id={"header.navbarLogin.composeNewArticle"} />
            </a>
          : undefined }
        <a onClick={user.logout} className={style("w3-bar-item","w3-button")}>
          <LocaleMessage id={"header.navbarLogin.logout"} />
        </a>
      </div>
    </div>
  }
}
