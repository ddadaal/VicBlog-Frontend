import React from "react";
import { observer } from "mobx-react";
import { observable, runInAction } from "mobx";
import { PageConfig } from "../index";

enum LoadStatus {
  NotLoaded,
  Loading,
  Loaded
}

@observer
export class AboutPage extends React.Component<any, any> {

  @observable status: LoadStatus = LoadStatus.NotLoaded;
  @observable content: JSX.Element = null;

  constructor(props) {
    super(props);
  }

  async load() {
    this.status = LoadStatus.Loading;
    const AboutProject = (await import("./AboutProjectPage")).AboutProject;
    runInAction("About PageConfig loaded",() => {
      this.status = LoadStatus.Loaded;
      this.content = <AboutProject/>;
    });
  }


  render() {
    return <div/>;
  }
}

export const aboutPageConfig: PageConfig = {
  path: "/about",
  render: async (props) => {
    const AboutPage = (await import("./")).AboutPage;
    return <AboutPage/>;
  },
  isThisPage: (pathname: string): boolean => {
    return pathname.startsWith("/about");
  },
  exact: true
};
