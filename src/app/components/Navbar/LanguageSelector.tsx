import { observer } from "mobx-react";
import React, { CSSProperties } from "react";
import FaLanguage from 'react-icons/lib/fa/language';
import style from "../style";
import { action, observable, runInAction } from "mobx";
import { LocaleStore } from "../../stores/LocaleStore";
import { Inject } from "react.di";

interface LanguageSelectorProps {
  sticky: boolean;
  navbarHeight: number;
}

interface LanguageSelectorItemProps {
  language;
  switchTo: (id: string) => void;
  switchingTo: boolean;
}

@observer
class LanguageSelectorItem extends React.Component<LanguageSelectorItemProps, any> {

  @Inject localeStore: LocaleStore; 

  render() {
    const { language } = this.props;
    const locale = this.localeStore;
    const current = language.id === locale.currentLanguage.id;
    const beingSwitchedTo = this.props.switchingTo;
    return <a key={language.id} onClick={() => this.props.switchTo(language.id)}
       className={style("w3-bar-item", "w3-button")}>
      {language.name}{current ? " (✔)" : ""}{beingSwitchedTo ? `(${locale.get("header.languageSwitchingTo")}...)`:""}
    </a>;
  }
}

@observer
export class LanguageSelector extends React.Component<LanguageSelectorProps, any> {
  @observable switchingToId: string = null;

  @Inject localeStore: LocaleStore;

  @action switchTo = async (id: string) => {
    this.switchingToId = id;
    const locale = this.localeStore;
    await locale.changeLanguage(id);
    runInAction(() => {
      this.switchingToId = null;
    });
  };


  render() {

    const contentStyle: CSSProperties = {
      position: "fixed",
      top: `${this.props.navbarHeight}px`
    };

    const locale = this.localeStore;
    return <div className={style("w3-dropdown-hover")}>
      <button className={style("w3-button")}>
        <FaLanguage size={16}/>
      </button>
      <div className={style("w3-dropdown-content","w3-bar-block","w3-card-4")} style={this.props.sticky ? contentStyle : null}>
        {locale.allLanguages.map(x =>
          <LanguageSelectorItem key={x.id} switchTo={this.switchTo}
            switchingTo={this.switchingToId === x.id} language={x}/>)}
      </div>
    </div>;
  }
}
