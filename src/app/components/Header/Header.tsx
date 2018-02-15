import * as React from "react";
import style from '../style';
import LogoPicture from 'svg-react-loader?name=LogoPicture!../../../assets/logo.svg';
import * as logoStyle from "./style.css";
import * as classNames from "classnames";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE } from "../../constants/stores";
import { LocaleStore } from "../../stores";

interface HeaderProps {
  [STORE_LOCALE]?: LocaleStore
}

@inject(STORE_LOCALE)
@observer
export class Header extends React.Component<HeaderProps, any> {

  render() {
    return <div className={classNames(style("w3-cell-row"), logoStyle.header)}>
      <div className={style("w3-container","w3-cell","w3-cell-bottom")}>
      <LogoPicture className={logoStyle.logo}/>
      </div>
      <div className={style("w3-container","w3-right", "w3-cell", "w3-cell-bottom")}>
        <p>{this.props[STORE_LOCALE].definitions.header.blogBrief}</p>
      </div>
    </div>;
  }
}