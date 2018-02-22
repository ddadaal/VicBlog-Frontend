import { inject, observer } from "mobx-react";
import { STORE_LOCALE } from "../../constants/stores";
import { LocaleStore } from "../../stores";
import * as React from "react";
import { FaLanguage } from 'react-icons/lib/fa';
import style from "../style";
import { Language } from "../../internationalization";
import { Dropdown } from "../Common/Dropdown";
import { CSSProperties } from "react";
import { action, observable, runInAction } from "mobx";
import { lang } from "moment";

interface LanguageSelectorProps {
  [STORE_LOCALE]?: LocaleStore,
  sticky: boolean,
  navbarHeight: number
}

interface LanguageSelectorItemProps {
  [STORE_LOCALE]?: LocaleStore,
  language: Language,
  switchTo: (id: string) => void,
  switchingTo: boolean
}

@inject(STORE_LOCALE)
@observer
class LanguageSelectorItem extends React.Component<LanguageSelectorItemProps, any> {



  render() {
    const { language } = this.props;
    const locale = this.props[STORE_LOCALE];
    return <a key={language.id} onClick={() => this.props.switchTo(language.id)}
       className={style("w3-bar-item", "w3-button")}>
      {language.name}{language.id === locale.currentLanguage.id ? " (✔)" : ""}{this.props.switchingTo ? "(loading...)":""}
    </a>;
  }
}

@inject(STORE_LOCALE)
@observer
export class LanguageSelector extends React.Component<LanguageSelectorProps, any> {
  @observable switchingToId: string = null;



  @action switchTo = async (id: string) => {
    this.switchingToId = id;
    const locale = this.props[STORE_LOCALE];
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

    const locale = this.props[STORE_LOCALE];
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