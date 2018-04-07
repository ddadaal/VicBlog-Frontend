import React from "react";
import style from '../style';
import FaGithub from 'react-icons/lib/fa/github';
import * as localStyle from './style.css';
import { LocaleDate, LocaleMessage, Localize } from "../../internationalization/components";
import { RouterStore } from "../../stores";
import { Inject } from "react.di";

declare var FRONT_END_BUILD: string;
declare var FRONT_END_BUILD_TIME: string;

const w3cssurl = "https://www.w3schools.com/w3css/default.asp";
const githubPages = "https://pages.github.com/";
const azure = "https://azure.microsoft.com/en-us/";
const react = "https://reactjs.org/";
const frontendGithub = "https://github.com/viccrubs/VicBlog-Frontend";
const backendGithub = "https://github.com/viccrubs/VicBlog-Backend";
const aspnetcore = "https://docs.microsoft.com/en-us/aspnet/core/";

interface FooterProps {

}

function GitHubIcon(props: {url: string}) {
  return <Localize replacements={{
    title: "footer.goToGithubRepo"
  }} >
    {p => <a {...p} target="_blank" href={props.url} style={{marginRight: "5px"}} >
      <FaGithub size={20}/>
    </a>}
  </Localize>;
}

function VersionInfoBlock(props: { versionId: string, buildTimeId: string }) {
  return <p>
    <LocaleMessage id={props.versionId} replacements={{
      version: FRONT_END_BUILD
    }}/>
    <LocaleMessage id={"footer.comma"}/>
    <LocaleMessage id={props.buildTimeId} replacements={{
      buildTime: <LocaleDate formatId={"footer.dateFormat"} input={FRONT_END_BUILD_TIME}/>
    }}/>
  </p>;
}

export class Footer extends React.Component<FooterProps, any> {

  @Inject routerStore: RouterStore;

  render() {
    return <footer className={style("w3-container")}>
      <div style={{textAlign: 'center'}} className={style("w3-container")}>
        <p>
          <LocaleMessage id={"footer.codeProudlyByVicCrubs"} replacements={{
            viccrubs: <a className={localStyle.link} onClick={() => this.routerStore.jumpTo("/about/me")}>VicCrubs</a>
          }}/>
        </p>
        <VersionInfoBlock versionId={"footer.frontend.version"}
                          buildTimeId={"footer.frontend.buildTime"}/>
        <p>
          <GitHubIcon url={frontendGithub}/>
          <LocaleMessage id={"footer.frontend.by"} replacements={{
            react: <a href={react}>React</a>,
            w3css: <a href={w3cssurl}>W3.CSS</a>
          }}/>
          <LocaleMessage id={"footer.comma"}/>
          <LocaleMessage id={"footer.frontend.deployedOn"} replacements={{
            deployment: <a href={githubPages}>GitHub Pages</a>
          }}/>
        </p>
        <p>
          <GitHubIcon url={backendGithub}/>
          <LocaleMessage id={"footer.backend.by"} replacements={{
            aspnetcore: <a href={aspnetcore}>ASP.NET Core</a>,
          }}/>
          <LocaleMessage id={"footer.comma"}/>
          <LocaleMessage id={"footer.backend.deployedOn"} replacements={{
            deployment: <a href={azure}>Microsoft Azure</a>
          }}/>
        </p>
      </div>
    </footer>
  }
}
