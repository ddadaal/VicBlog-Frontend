import React from "react";
import style from "../../components/style";
import { ProfilePanel } from "../../components/ProfilePanel";
import * as localStyle from './style.css';

interface HomePageProps {
}

export class HomePage extends React.Component<HomePageProps, any> {

  render() {
    console.log("render");
     return <div className={style("w3-row", localStyle.container)}>
      <div className={style("w3-col", "l3", "s12", "w3-padding")}>
        <ProfilePanel/>
      </div>
      <div className={style("w3-col", "l9", "s12", "w3-padding")}>
        hahah
      </div>
    </div>
  }
}



