import React, { ReactNode } from 'react';
import style from "../../components/style";
import { AboutMenu } from "../../components/About/AboutMenu";

interface Props {

}

export class AboutLayout extends React.Component<Props, {}> {
  render() {
    return <div className={style("w3-row-padding","w3-margin-top")}>
      <div className={style("w3-col", "l2", "s12")}>
        <AboutMenu/>
        <hr className={style("w3-hide-large")}/>
      </div>

      <div className={style("w3-col", "l10", "s12")}>
        {this.props.children}
      </div>
    </div>;
  }
}
