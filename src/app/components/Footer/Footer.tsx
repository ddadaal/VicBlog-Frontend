import * as React from "react";
import style from '../style';
import { STORE_ROUTER } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import { RouterStore } from "../../stores";
import { FaGithub } from 'react-icons/lib/fa';
import { LocaleMessage } from "../Common/Locale";

declare var FRONT_END_BUILD: string;
declare var FRONT_END_BUILD_TIME: string;

const w3cssurl = "https://www.w3schools.com/w3css/default.asp";
const fabric = "https://developer.microsoft.com/en-us/fabric";
const githubPages = "https://pages.github.com/";
const azure = "https://azure.microsoft.com/en-us/";

interface FooterProps {
  [STORE_ROUTER]?: RouterStore,
}

@inject(STORE_ROUTER)
@observer
export class Footer extends React.Component<FooterProps, any> {

  render() {
    const router = this.props[STORE_ROUTER];

    return <footer className={style("w3-container")}>
      <div style={{textAlign: 'center'}} className={style("w3-container")}>
        <p>
          <LocaleMessage id={"footer.codeProudlyByVicCrubs"} replacements={{
            viccrubs: <a onClick={router.jumpToAboutMe}>VicCrubs</a>
          }}/>
        </p>
        <p>
          <LocaleMessage id={"footer.themedWith"} replacements={{
            w3css:<a href={w3cssurl}>W3.CSS</a>,
            fabric: <a href={fabric}>Office UI Fabric</a>
          }}/>
        </p>
        <p>
        <LocaleMessage id={"footer.frontend"} replacements={{
          build: FRONT_END_BUILD,
          buildTime: FRONT_END_BUILD_TIME,
          frontendDeployment: <a href={githubPages}>GitHub Pages</a>
        }}/>
        </p>
      </div>
    </footer>
  }
}