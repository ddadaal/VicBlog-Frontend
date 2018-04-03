import React from "react";
import { observer } from "mobx-react";
import { observable, runInAction } from "mobx";

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

