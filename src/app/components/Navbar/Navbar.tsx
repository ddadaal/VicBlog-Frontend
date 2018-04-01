import React from "react";
import { inject, observer } from "mobx-react";
import { STORE_ROUTER } from "../../constants/stores";
import { RouterStore } from "../../stores";
import style from '../style';
import { LanguageSelector } from "./LanguageSelector";
import { action, observable } from "mobx";
import * as localStyle from './style.css';
import { UserIndicator } from "./NavbarUserIndicator/UserIndicator";
import { LocaleMessage } from "../../internationalization/components";
import { Sticky } from "../Common/Sticky";
import { NavbarModals } from "./NavbarModals";
import { PageConfig } from "../../pages";
import { homePageConfig } from "../../pages/Home";
import { aboutPageConfig } from "../../pages/About";

interface NavbarLinkItemProps {
  [STORE_ROUTER]?: RouterStore;
  textId: string;
  pathConfig: PageConfig;
  visibleOnBigScreen: boolean;
}

@inject(STORE_ROUTER)
@observer
class NavbarLinkItem extends React.Component<NavbarLinkItemProps, any> {

  jumpTo = () => {
    const jumpToUrl = this.props.pathConfig.path;
    this.props[STORE_ROUTER].jumpTo(jumpToUrl);
  };

  render() {

    const route = this.props[STORE_ROUTER];
    const active = route.currentPage == this.props.pathConfig;
    return <a onClick={this.jumpTo}
              className={style("w3-bar-item", "w3-button",{
                ["w3-indigo"]: active,
                ["w3-hide-small"]: this.props.visibleOnBigScreen
              })}>
      <LocaleMessage id={this.props.textId}/>
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
            <NavbarLinkItem textId={"header.home"} pathConfig={homePageConfig} visibleOnBigScreen={true}/>
            <NavbarLinkItem textId={"header.about"} pathConfig={aboutPageConfig} visibleOnBigScreen={true}/>

            <UserIndicator notLoggedInStyle={style("w3-bar-item", "w3-button", "w3-hide-small", "w3-right")}
                           loggedInStyle={style("w3-dropdown-hover", "w3-right", "w3-hide-small")}/>

            <a className={style("w3-bar-item", "w3-button", "w3-right", "w3-hide-large", "w3-hide-medium")}
               onClick={this.toggleCollapse}>&#9776;</a>
          </div>
          <div className={style("w3-bar-block", "w3-blue", "w3-hide-large", "w3-hide-medium")}
               style={{display: this.collapsed ? "block" : "none"}}>
            <NavbarLinkItem textId={"header.home"} pathConfig={homePageConfig} visibleOnBigScreen={false}/>
            <NavbarLinkItem textId={"header.about"} pathConfig={aboutPageConfig} visibleOnBigScreen={false}/>
            <UserIndicator notLoggedInStyle={style("w3-bar-item", "w3-button")}
                           loggedInStyle={style("w3-dropdown-hover")}/>
          </div>
        </>}
      </Sticky>
    </div>;
  }
}
