import React from "react";
import style from '../../style';
import { observer } from "mobx-react";
import { UserStore } from "../../../stores";
import { LocaleMessage } from "../../../internationalization/components";
import { Inject } from "react.di";

export interface LoggedInIndicatorProps {
  className: string;
}

@observer
export class LoggedInIndicator extends React.Component<LoggedInIndicatorProps, any> {

  @Inject userStore: UserStore;

  render() {
    return <div className={this.props.className}>
      <button className={style("w3-button")}>
        <LocaleMessage id={"header.navbarLogin.loggedInPrompt"} replacements={{username: this.userStore.user.username}}/>
      </button>
      <div className={style("w3-dropdown-content","w3-bar-block","w3-card-4")}>
        {this.userStore.isAdmin
          ? <a className={style("w3-bar-item","w3-button")}>
            <LocaleMessage id={"header.navbarLogin.composeNewArticle"} />
            </a>
          : undefined }
        <a onClick={this.userStore.logout} className={style("w3-bar-item","w3-button")}>
          <LocaleMessage id={"header.navbarLogin.logout"} />
        </a>
      </div>
    </div>
  }
}
