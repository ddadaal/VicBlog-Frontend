import React from "react";
import { inject, observer } from "mobx-react";
import { STORE_ROUTER } from "../../constants/stores";
import style from '../style';
import { LanguageSelector } from "./LanguageSelector";
import { action, observable } from "mobx";
import * as localStyle from './style.css';
import { UserIndicator } from "./NavbarUserIndicator/UserIndicator";
import { LocaleMessage } from "../../internationalization/components";
import { Sticky } from "../Common/Sticky";
import { NavbarModals } from "./NavbarModals";
import { RouterStoreProps } from "../../stores/RouterStore";

interface NavbarRoutesConfig {
  path: string;
  textId: string;
  identify: (path: string) => boolean;
}

const routes: NavbarRoutesConfig[] = [
  {
    path: "/",
    textId: "header.home",
    identify: (path: string) => path === '/'
  },
  {
    path: "/articles",
    textId: "header.articleList",
    identify: (path) => path.startsWith("/articles")
  },
  {
    path: "/about",
    textId: "header.about",
    identify: (path) => path.startsWith("/about")
  }
];


interface NavbarLinkItemProps extends RouterStoreProps {
  config: NavbarRoutesConfig;
  visibleOnBigScreen: boolean;
}



@inject(STORE_ROUTER)
@observer
class NavbarLinkItem extends React.Component<NavbarLinkItemProps, any> {

  jumpTo = () => {
    const jumpToUrl = this.props.config.path;
    this.props[STORE_ROUTER].jumpTo(jumpToUrl);
  };

  render() {

    const route = this.props[STORE_ROUTER];
    const active = this.props.config.identify(route.location.pathname);
    return <a onClick={this.jumpTo}
              className={style("w3-bar-item", "w3-button",{
                ["w3-indigo"]: active,
                ["w3-hide-small"]: this.props.visibleOnBigScreen
              })}>
      <LocaleMessage id={this.props.config.textId}/>
    </a>
  }
}


@observer
export class Navbar extends React.Component<any, any> {

  @observable collapsed = false;
  @observable dom: Element;

  @action toggleCollapse = () => {
    this.collapsed = !this.collapsed;
  };


  @action ref = (dom) => {
    this.dom = dom;
  };

  render() {
    return <div ref={this.ref}>
      <NavbarModals/>
      <Sticky>
        {(sticky) => <>
          <div className={style("w3-bar", "w3-blue",{[localStyle.sticky]: sticky})}>
            <LanguageSelector sticky={sticky}
                              navbarHeight={this.dom ? this.dom.getBoundingClientRect().height : 0}/>
            {routes.map((x,i) => <NavbarLinkItem key={i} config={x} visibleOnBigScreen={true}/> )}
            <UserIndicator notLoggedInStyle={style("w3-bar-item", "w3-button", "w3-hide-small", "w3-right")}
                           loggedInStyle={style("w3-dropdown-hover", "w3-right", "w3-hide-small")}/>

            <a className={style("w3-bar-item", "w3-button", "w3-right", "w3-hide-large", "w3-hide-medium")}
               onClick={this.toggleCollapse}>&#9776;</a>
          </div>
          <div className={style("w3-bar-block", "w3-blue", "w3-hide-large", "w3-hide-medium")}
               style={{display: this.collapsed ? "block" : "none"}}>
            {routes.map(x => <NavbarLinkItem config={x} visibleOnBigScreen={false}/> )}
            <UserIndicator notLoggedInStyle={style("w3-bar-item", "w3-button")}
                           loggedInStyle={style("w3-dropdown-hover")}/>
          </div>
        </>}
      </Sticky>
    </div>;
  }
}
