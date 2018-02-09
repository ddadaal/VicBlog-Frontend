import { inject, observer } from "mobx-react";
import { STORE_LOCALE, STORE_USER } from "../../constants/stores";
import { LocaleStore } from "../../stores";
import * as React from "react";
import { FaLanguage } from 'react-icons/lib/fa';
import style from "../style";
import { Language } from "../../internationalization";

interface LanguageSelectorProps {
  [STORE_LOCALE]? : LocaleStore;
  className?: string
}

@inject(STORE_LOCALE)
@observer
export class LanguageSelector extends React.Component<LanguageSelectorProps, any> {
  locale = this.props[STORE_LOCALE];

  constructLanguage(language: Language) {
    return <a key={language.id} onClick={() => this.locale.changeLanguage(language.id)}
              className={style("w3-bar-item","w3-button")}>
      {language.name}{language.id === this.locale.currentLanguage.id ? " (✔)" : ""}
    </a>;
  }

  render() {

    return <div className={this.props.className}>
      <button className={style("w3-button")}>
        <FaLanguage size={16}/>
      </button>
      <div className={style("w3-dropdown-content","w3-bar-block","w3-card-4")}>
        {this.locale.allLanguages
          .map(x => this.constructLanguage(x))}
      </div>
    </div>;
  }
}