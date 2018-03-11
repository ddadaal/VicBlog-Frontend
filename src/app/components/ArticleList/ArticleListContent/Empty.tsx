import React from "react";
import style from '../../style';
import { LocaleMessage } from "../../../internationalization/components";

export class EmptyContent extends React.Component<any, any> {
  render() {
    return <div className={style("w3-container","w3-center")}>
      <p><LocaleMessage id={"articleList.noArticle"}/></p>
    </div>
  }
}
