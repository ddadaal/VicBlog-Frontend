import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_ROUTER } from "../../constants/stores";
import { RouterStore } from "../../stores";
import * as classNames from "classnames";
import style from '../style';
import { LanguageSelector } from "./LanguageSelector";
import { action, observable } from "mobx";
import * as localStyle from './style.css';
import { aboutPageConfig, articleListPageConfig, homePageConfig, PageConfig } from "../../pages";
import { UserIndicator } from "./NavbarUserIndicator/UserIndicator";
import { AsyncComponent } from "../../routes/AsyncComponent";
import { LocaleMessage } from "../Common/Locale";


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


@observer
export class Navbar extends React.Component<any, any> {

  @observable collapsed = false;
  @observable sticky = false;
  dom: Element;

  get stickyApplicable() {
    return !!window && this.dom;
  }

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

  renderModalsAsync = async () => {
    const Modals = (await import("./NavbarModals")).NavbarModals;
    return <Modals/>;
  };

  ref = (dom) => {
    this.dom = dom;
  };


  render() {
    return <div ref={this.ref}>
      <AsyncComponent componentWhenLoading={"Loading..."} render={this.renderModalsAsync}/>

      <div className={classNames(style("w3-bar","w3-blue"), {[localStyle.sticky]: this.sticky})}>
        <LanguageSelector sticky={this.sticky} navbarHeight={this.dom ? this.dom.getBoundingClientRect().height : 0}/>
        <NavbarLinkItem textId={"header.home"} pathConfig={homePageConfig} visibleOnBigScreen={true}/>
        <NavbarLinkItem textId={"header.articleList"} pathConfig={articleListPageConfig} visibleOnBigScreen={true}/>
        <NavbarLinkItem textId={"header.about"} pathConfig={aboutPageConfig} visibleOnBigScreen={true}/>

        <UserIndicator notLoggedInStyle={style("w3-bar-item","w3-button","w3-hide-small","w3-right")}
                       loggedInStyle={style("w3-dropdown-hover","w3-right","w3-hide-small")}/>

        <a className={style("w3-bar-item","w3-button","w3-right","w3-hide-large","w3-hide-medium")}
           onClick={this.toggleCollapse}>&#9776;</a>
      </div>
      { this.collapsed ? (
      <div className={style("w3-bar-block","w3-blue","w3-hide-large","w3-hide-medium")}>
        <NavbarLinkItem textId={"header.home"} pathConfig={homePageConfig} visibleOnBigScreen={false}/>
        <NavbarLinkItem textId={"header.articleList"} pathConfig={articleListPageConfig} visibleOnBigScreen={false}/>
        <NavbarLinkItem textId={"header.about"} pathConfig={aboutPageConfig} visibleOnBigScreen={false}/>
        <UserIndicator notLoggedInStyle={style("w3-bar-item","w3-button")} loggedInStyle={style("w3-dropdown-hover")}/>
      </div>) : null}
    </div>;
  }
}