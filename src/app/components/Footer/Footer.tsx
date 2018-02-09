import * as React from "react";
import style from '../style';
import { STORE_LOCALE, STORE_ROUTER } from "../../constants/stores";
import { inject, observer } from "mobx-react";
import { LocaleStore, RouterStore } from "../../stores";
import { FaGithub } from 'react-icons/lib/fa';

declare var FRONT_END_BUILD: string;
declare var FRONT_END_BUILD_TIME: string;

const w3cssurl = "https://www.w3schools.com/w3css/default.asp";
const fabric = "https://developer.microsoft.com/en-us/fabric";
const githubPages = "https://pages.github.com/";
const azure = "https://azure.microsoft.com/en-us/";

interface FooterProps {
  [STORE_ROUTER]?: RouterStore,
  [STORE_LOCALE]?: LocaleStore
}

@inject(STORE_ROUTER, STORE_LOCALE)
@observer
export class Footer extends React.Component<FooterProps, any> {

  render() {
    const router = this.props[STORE_ROUTER];
    const locale = this.props[STORE_LOCALE];

    return <footer className={style("w3-container")}>
      <div style={{textAlign: 'center'}} className={style("w3-container")}>
        <p>{locale.format(locale.definition.footer.codeProudlyByVicCrubs, { viccrubs: <a onClick={router.jumpToAboutMe}>VicCrubs</a>})}</p>
        <p>{locale.format(locale.definition.footer.themedWith, {w3css:<a href={w3cssurl}>W3.CSS</a>, fabric: <a href={fabric}>Office UI Fabric</a>})}</p>
        <p>{locale.format(locale.definition.footer.deployedOn, {githubPages: <a href={githubPages}>GitHub Pages</a>, azure: <a href={azure}>Microsoft Azure Global</a>})}</p>
        <p>{locale.format(locale.definition.footer.frontendVersion, { version: FRONT_END_BUILD, buildTime: FRONT_END_BUILD_TIME})}</p>
      </div>
    </footer>
  }
}