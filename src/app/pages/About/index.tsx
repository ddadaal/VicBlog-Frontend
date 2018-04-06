import React from 'react';
import { AboutLayout } from "./AboutLayout";
import { Switch } from "react-router";
import { AsyncPageConfig, PageConfig, RedirectPageConfig } from "../../routes/RouteConfig";

interface Props {

}

const rootRedirectConfig = new RedirectPageConfig({
  path: "/about",
  to: "/about/project"
});

const aboutMePageConfig: PageConfig = new AsyncPageConfig({
  path: "/about/me",
  render: async () => {
    const AboutMePage= (await import("./AboutMePage")).AboutMePage;
    return <AboutMePage/>;
  }
});

const aboutProjectPageConfig = new AsyncPageConfig({
  path: "/about/project",
  render: async () => {
    const AboutProject = (await import("./AboutProjectPage")).AboutProjectPage;
    return <AboutProject/>;
  }
});

export class AboutPage extends React.Component<Props, {}> {
  render() {
    return <AboutLayout>
      <Switch>
        {rootRedirectConfig.construct()}
        {aboutMePageConfig.construct()}
        {aboutProjectPageConfig.construct()}
      </Switch>
    </AboutLayout>
  }
}
