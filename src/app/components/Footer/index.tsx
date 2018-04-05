import React from "react";
import style from '../style';
import { observer } from "mobx-react";
import { RouterStore } from "../../stores";
import FaGithub from 'react-icons/lib/fa/github';
import * as localStyle from './style.css';
import { LocaleDate, LocaleMessage, Localize } from "../../internationalization/components";
import { Inject } from "react.di";

declare var FRONT_END_BUILD: string;
declare var FRONT_END_BUILD_TIME: string;

const w3cssurl = "https://www.w3schools.com/w3css/default.asp";
const githubPages = "https://pages.github.com/";
const azure = "https://azure.microsoft.com/en-us/";
const react = "https://reactjs.org/";
const frontendGithub = "https://github.com/viccrubs/VicBlog-Frontend";
const backendGithub = "https://github.com/viccrubs/VicBlog-Backend";

interface FooterProps {

}

function VersionInfoBlock(props: { githubUrl: string, versionId: string, buildTimeId: string }) {
  return <p>
    <Localize replacements={{
      title: "footer.goToGithubRepo"
    }} >
      {p => <a {...p} target="_blank" href={props.githubUrl} style={{marginRight: "5px"}} >
        <FaGithub size={20}/>
      </a>}
    </Localize>
    <LocaleMessage id={props.versionId} replacements={{
      version: FRONT_END_BUILD
    }}/>
    <LocaleMessage id={"footer.comma"}/>
    <LocaleMessage id={props.buildTimeId} replacements={{
      buildTime: <LocaleDate formatId={"footer.dateFormat"} input={FRONT_END_BUILD_TIME}/>
    }}/>
  </p>;
}

@observer
export class Footer extends React.Component<FooterProps, any> {

  @Inject routerStore: RouterStore;

  render() {
    return <footer className={style("w3-container")}>
      <div style={{textAlign: 'center'}} className={style("w3-container")}>
        <p>
          <LocaleMessage id={"footer.codeProudlyByVicCrubs"} replacements={{
            viccrubs: <a onClick={this.routerStore.jumpToAboutMe} className={localStyle.link}>VicCrubs</a>
          }}/>
        </p>
        <VersionInfoBlock githubUrl={frontendGithub} versionId={"footer.frontend.version"}
                          buildTimeId={"footer.frontend.buildTime"}/>
        <p>
          <LocaleMessage id={"footer.frontend.by"} replacements={{
            react: <a href={react}>React</a>,
            w3css: <a href={w3cssurl}>W3.CSS</a>
          }}/>
          <LocaleMessage id={"footer.comma"}/>
          <LocaleMessage id={"footer.frontend.deployedOn"} replacements={{
            deployment: <a href={githubPages}>GitHub Pages</a>
          }}/>
        </p>
      </div>
    </footer>
  }
}
