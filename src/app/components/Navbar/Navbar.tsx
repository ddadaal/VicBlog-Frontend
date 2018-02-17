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
import * as ReactDOM from "react-dom";
import * as localStyle from './style.css';
import { LoginModal } from "../Modals/LoginModal/LoginModal";
import { LocaleMessage } from "../../internationalization";

export interface HeaderContainerProps {
  [STORE_ROUTER]?: RouterStore,
  [STORE_USER]? : UserStore
}

@inject(STORE_ROUTER, STORE_USER)
@observer
export class Navbar extends React.Component<HeaderContainerProps, any> {

  @observable collapsed = false;
  @observable sticky = false;

  renderUserIndicator = (notLoggedinStyle: string, loginStyle: string) => {
    return this.props[STORE_USER].loggedIn
      ? <LoggedInIndicator className={loginStyle}/>
      : <NotLoggedInIndicator className={notLoggedinStyle}/>;
  };

  @action handleScroll = () => {
    const offsetTop = ReactDOM.findDOMNode(this).getBoundingClientRect().top;
    this.sticky = window.pageYOffset >= offsetTop;
  };

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  @action toggleCollapse = () => {
    this.collapsed = !this.collapsed;
  };

  render() {
    const route = this.props[STORE_ROUTER];
    return <div >
      <LoginModal/>
      <div className={classNames(style("w3-bar","w3-blue"), {[localStyle.sticky]: this.sticky})}>
        <LanguageSelector className={style("w3-dropdown-hover")}/>
        <a onClick={route.jumpToHome} className={style("w3-bar-item","w3-button","w3-hide-small")}>
          <LocaleMessage id={"header.home"}/>
          </a>
        <a onClick={route.jumpToArticleList} className={style("w3-bar-item","w3-button","w3-hide-small")}>
          <LocaleMessage id={"header.articleList"}/>
          </a>
        <a onClick={route.jumpToAbout} className={style("w3-bar-item","w3-button","w3-hide-small")}>
          <LocaleMessage id={"header.about"}/>
          </a>
        {this.renderUserIndicator(
          style("w3-bar-item","w3-button","w3-hide-small","w3-right"),
          style("w3-dropdown-hover","w3-right","w3-hide-small")
        )}
        <a className={style("w3-bar-item","w3-button","w3-right","w3-hide-large","w3-hide-medium")}
           onClick={this.toggleCollapse}>&#9776;</a>
      </div>
      { this.collapsed ? (
      <div className={style("w3-bar-block","w3-blue","w3-hide-large","w3-hide-medium")}>
        <a onClick={route.jumpToHome} className={style("w3-bar-item","w3-button")}>
          <LocaleMessage id={"header.home"}/>
          </a>
        <a onClick={route.jumpToArticleList} className={style("w3-bar-item","w3-button")}>
          <LocaleMessage id={"header.articleList"}/>
          </a>
        <a onClick={route.jumpToAbout} className={style("w3-bar-item","w3-button")}>
          <LocaleMessage id={"header.about"}/>
          </a>
        {this.renderUserIndicator(
          style("w3-bar-item","w3-button"),
          style("w3-dropdown-hover")
        )}
      </div>) : null}
    </div>;
  }
}