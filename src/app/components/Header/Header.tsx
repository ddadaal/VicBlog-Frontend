import * as React from "react";
import style from '../style';
import * as logoStyle from "./style.css";
import { LocaleMessage } from "../Common/Locale";
import { SvgImg } from "../Common/SvgImg";

export class Header extends React.Component<any, any> {

  render() {
    return <div className={style("w3-cell-row",logoStyle.header)}>
      <div className={style("w3-container","w3-cell","w3-cell-bottom")}>
        <SvgImg filePath={"logo.svg"} size={40}/>
      </div>
      <div className={style("w3-container","w3-right", "w3-cell", "w3-cell-bottom")}>
        <p>
          <LocaleMessage id={"header.blogBrief"}/>
        </p>
      </div>
    </div>;
  }
}