import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE } from "../../../constants/stores";
import { LocaleStore } from "../../../stores";
import { action, observable } from "mobx";

import style from '../../style';
import { Modal, ModalBottom } from "../Modal";
import { AsyncComponent } from "../../../routes/AsyncComponent";
import { LocaleMessage } from "../../Common/Locale";
import { Dropdown } from "../../Common/Dropdown";
import {
  LanguageSetting,
  registerAttentionLanguageSettings
} from "../../../constants/configs/registerAttentionLanguageSettings";



const MarkdownIt = require("markdown-it");



interface TermsModalProps {
  [STORE_LOCALE]?: LocaleStore,
  toggleModalShown: () => void
}



function getLanguage(id: string) {
  return registerAttentionLanguageSettings.find(x => x.id === id)
    || registerAttentionLanguageSettings.find(x => x.id === "fallback");
}

interface AttentionModalContentProps {
  language: LanguageSetting
}

export class AttentionModalContent extends React.Component<AttentionModalContentProps, any> {

  load = async () => {
    const res = await import(`../../../../assets/registerAttention/${this.props.language.filename}.md`);

    const md = new MarkdownIt();
    const content = md.render(res);
    return <div className={style("w3-container")} dangerouslySetInnerHTML={{__html: content}}/>;
  };

  render() {
    return <AsyncComponent key={this.props.language.id} render={this.load} componentWhenLoading={"Loading..."}/>
  };
}


@inject(STORE_LOCALE)
@observer
export class AttentionModal extends React.Component<TermsModalProps, any> {

  @observable selectedLanguage: LanguageSetting = getLanguage(this.props[STORE_LOCALE].currentLanguage.id);


  @action changeLanguage = (language: LanguageSetting) => {
    this.selectedLanguage = language;
  };

  constructLanguageItems = (language: LanguageSetting) => {
    return <a key={language.id} onClick={() => this.changeLanguage(language)}
              className={style("w3-bar-item", "w3-button")}>
      {language.name}{language.id === this.selectedLanguage.id ? " (✔)" : ""}
    </a>;
  };

  render() {
    const dropdownButton = <button className={style("w3-button")}>{this.selectedLanguage.name}</button>;

    return <Modal shown={true}
                  titleId={"registerModal.registerAttention.title"}
                  toggleShown={this.props.toggleModalShown}>
      <AttentionModalContent language={this.selectedLanguage}/>
      <ModalBottom>
        <Dropdown entry={dropdownButton}>
          {registerAttentionLanguageSettings.filter(x => x.id !== "fallback").map(this.constructLanguageItems)}
        </Dropdown>
        <button onClick={this.props.toggleModalShown} type="button"
                className={style("w3-button", "w3-blue", "w3-right", "w3-padding")}>
          <LocaleMessage id={"registerModal.registerAttention.acknowledged"}/>
        </button>
      </ModalBottom>
  </Modal>;
  }
}