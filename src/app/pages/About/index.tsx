import React from 'react';
import { AboutLayout } from "./AboutLayout";
import { Switch } from "react-router";
import { AsyncPageConfig, PageConfig, RedirectPageConfig } from "../../routes/RouteConfig";

interface Props {

}

const redirectConfig = new RedirectPageConfig({
  path: "",
  to: "/about/project",
  exact: false
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

        {aboutMePageConfig.construct()}
        {aboutProjectPageConfig.construct()}
        {redirectConfig.construct()}
      </Switch>
    </AboutLayout>
  }
}
