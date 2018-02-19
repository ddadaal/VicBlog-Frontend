import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE, STORE_ROUTER, STORE_USER } from "../../constants/stores";
import { LocaleStore, RouterStore } from "../../stores";
import { UserStore } from "../../stores";
import { LoggedInIndicator, NotLoggedInIndicator } from "./NavbarUserIndicator";
import * as classNames from "classnames";
import style from '../style';
import { LanguageSelector } from "./LanguageSelector";
import { action, observable } from "mobx";
import * as localStyle from './style.css';
import { LoginModal } from "../Modals/LoginModal";
import { LocaleMessage } from "../../internationalization";
import { RegisterModal } from "../Modals/RegisterModal";
import { aboutPageConfig, articleListPageConfig, homePageConfig, PageConfig } from "../../pages";

export interface HeaderContainerProps {
  [STORE_ROUTER]?: RouterStore,
  [STORE_USER]? : UserStore
}

interface NavbarLinkItemProps {
  [STORE_ROUTER]?: RouterStore,
  textId: string,
  pathConfig: PageConfig,
  visibleOnBigScreen: boolean
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
    const active =  route.currentPage == this.props.pathConfig;
    return <a onClick={this.jumpTo}
              className={classNames(
                style("w3-bar-item","w3-button"),
                {
                  [style("w3-indigo")]: active,
                  [style("w3-hide-small")]: this.props.visibleOnBigScreen
                })}>
      <LocaleMessage id={this.props.textId}/>
    </a>
  }
}

@inject(STORE_USER)
@observer
export class Navbar extends React.Component<HeaderContainerProps, any> {

  @observable collapsed = false;
  @observable sticky = false;

  private dom;

  get stickyApplicable() {
    return !!window && this.dom;
  }

  renderUserIndicator = (notLoggedinStyle: string, loginStyle: string) => {
    return this.props[STORE_USER].loggedIn
      ? <LoggedInIndicator className={loginStyle}/>
      : <NotLoggedInIndicator className={notLoggedinStyle}/>;
  };

  @action handleScroll = () => {
    if (this.stickyApplicable) {
      this.sticky = window.pageYOffset >= this.dom.getBoundingClientRect().top;
    }
  };

  componentDidMount(){
    if (this.stickyApplicable) {
      window.addEventListener('scroll', this.handleScroll);
    }

  }

  componentWillUnmount() {
    if (this.stickyApplicable) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  @action toggleCollapse = () => {
    this.collapsed = !this.collapsed;
  };

  render() {
    const user = this.props[STORE_USER];

    return <div ref={dom => this.dom = dom}>
      { user.loginModalShown ? <LoginModal/> : null}
      { user.registerModalShown ? <RegisterModal/> : null}
      <div className={classNames(style("w3-bar","w3-blue"), {[localStyle.sticky]: this.sticky})}>
        <LanguageSelector className={style("w3-dropdown-hover")}/>
        <NavbarLinkItem textId={"header.home"} pathConfig={homePageConfig} visibleOnBigScreen={true}/>
        <NavbarLinkItem textId={"header.articleList"} pathConfig={articleListPageConfig} visibleOnBigScreen={true}/>
        <NavbarLinkItem textId={"header.about"} pathConfig={aboutPageConfig} visibleOnBigScreen={true}/>

        {this.renderUserIndicator(
          style("w3-bar-item","w3-button","w3-hide-small","w3-right"),
          style("w3-dropdown-hover","w3-right","w3-hide-small")
        )}
        <a className={style("w3-bar-item","w3-button","w3-right","w3-hide-large","w3-hide-medium")}
           onClick={this.toggleCollapse}>&#9776;</a>
      </div>
      { this.collapsed ? (
      <div className={style("w3-bar-block","w3-blue","w3-hide-large","w3-hide-medium")}>
        <NavbarLinkItem textId={"header.home"} pathConfig={homePageConfig} visibleOnBigScreen={false}/>
        <NavbarLinkItem textId={"header.articleList"} pathConfig={articleListPageConfig} visibleOnBigScreen={false}/>
        <NavbarLinkItem textId={"header.about"} pathConfig={aboutPageConfig} visibleOnBigScreen={false}/>
        {this.renderUserIndicator(
          style("w3-bar-item","w3-button"),
          style("w3-dropdown-hover")
        )}
      </div>) : null}
    </div>;
  }
}