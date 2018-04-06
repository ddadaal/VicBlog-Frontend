import React from "react";
import style from "../../components/style";
import { ProfilePanel } from "../../components/ProfilePanel";
import * as localStyle from './style.css';
import { LocalizedDocumentTitle } from "../../internationalization/components/LocalizedDocumentTitle";
import { RecentArticlesPanel } from "./RecentArticlesPanel";

interface HomePageProps {
}

export class HomePage extends React.Component<HomePageProps, any> {

  render() {

    return <LocalizedDocumentTitle formatId={"homepage.documentTitle"}>
      <div className={style("w3-row", localStyle.container)}>
        <div className={style("w3-col", "l3", "s12", "w3-padding", "w3-container", localStyle.left)}>
          <ProfilePanel/>
        </div>
        <div className={style("w3-col", "l9", "s12", "w3-padding", "w3-container", localStyle.right)}>
          <RecentArticlesPanel/>
        </div>
      </div>
    </LocalizedDocumentTitle>
  }
}



