import * as React from "react";
import style from '../../style';
import { inject, observer } from "mobx-react";
import { STORE_LOCALE, STORE_USER } from "../../../constants/stores";
import { LocaleStore, UserStore } from "../../../stores";
import * as classNames from 'classnames';

export interface LoggedInIndicatorProps {
  [STORE_LOCALE]? : LocaleStore,
  [STORE_USER]? :UserStore,
  className: string,
}

@inject(STORE_LOCALE, STORE_USER)
@observer
export class LoggedInIndicator extends React.Component<LoggedInIndicatorProps, any> {
  render() {
    const locale = this.props[STORE_LOCALE];
    const definition = locale.definitions.header.navbarLogin;
    const user = this.props[STORE_USER];
    return <div className={this.props.className}>
      <button className={style("w3-button")}>
        {locale.format(definition.loggedInPrompt, {username: user.user.name})}
      </button>
      <div className={style("w3-dropdown-content","w3-bar-block","w3-card-4")}>
        {user.isAdmin ? <a className={style("w3-bar-item","w3-button")}>{definition.composeNewArticle}</a> : undefined }
        <a onClick={user.logout} className={style("w3-bar-item","w3-button")}>{definition.logout}</a>
      </div>
    </div>
  }
}