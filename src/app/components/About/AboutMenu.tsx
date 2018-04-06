import React from 'react';
import style from '../style';
import { LocaleMessage } from "../../internationalization/components";
import { RouterStore } from "../../stores";
import { Inject } from "react.di";
import { observer } from "mobx-react";

interface Props {

}

interface Route {

  textId: string;
  path: string;

  identify(pathname: string): boolean;
}

const routes = [
  {
    textId: "about.aboutProject.menu",
    path: "/about/project",
    identify: (pathname: string) => pathname === "/about/project"
  },
  {
    textId: "about.aboutMe.menu",
    path: "/about/me",
    identify: (pathname: string) => pathname === "/about/me"
  }
];

function AboutMenuItem(props: { route: Route, active: boolean, onClick: () => void }) {
  return <div className={style("w3-bar-item", "w3-button", {["w3-indigo"]: props.active})}
              onClick={props.onClick}>
    <LocaleMessage id={props.route.textId}/>
  </div>
}

@observer
export class AboutMenu extends React.Component<Props, {}> {


  @Inject routerStore: RouterStore;

  render() {

    const activeOne = routes.find(x => x.identify(this.routerStore.location.pathname));

    return <div className={style("w3-bar-block")}>
      {routes.map(x =>
        <AboutMenuItem key={x.path} route={x} active={activeOne === x} onClick={() => this.routerStore.jumpTo(x.path)}/>)
      }
    </div>
  }
}
