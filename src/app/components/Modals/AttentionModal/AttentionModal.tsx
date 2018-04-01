import React from "react";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE } from "../../../constants/stores";
import { action, observable } from "mobx";
import style from '../../style';
import { Modal, ModalBottom } from "../Modal";
import { LocaleMessage } from "../../../internationalization/components";
import { Dropdown } from "../../Common/Dropdown";
import { AttentionModalContent } from "./AttentionModalContent";
import { AttentionModalStore, LanguageSetting } from "./AttentionModalStore";
import { LocaleStore } from "../../../internationalization";


interface TermsModalProps {
  [STORE_LOCALE]?: LocaleStore,
  toggleModalShown: () => void
}




@inject(STORE_LOCALE)
@observer
export class AttentionModal extends React.Component<TermsModalProps, any> {

  private store: AttentionModalStore = new AttentionModalStore();
  @observable selectedLanguage: LanguageSetting = this.store.getLanguage(this.props[STORE_LOCALE].currentLanguage.id);

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

    return <Modal titleId={"registerModal.registerAttention.title"} toggleShown={this.props.toggleModalShown}>
      <AttentionModalContent language={this.selectedLanguage} />
      <ModalBottom>
        <Dropdown entry={dropdownButton}>
          {this.store.allLanguages.filter(x => x.id !== "fallback").map(this.constructLanguageItems)}
        </Dropdown>
        <button onClick={this.props.toggleModalShown} type="button"
          className={style("w3-button", "w3-blue", "w3-right", "w3-padding")}>
          <LocaleMessage id={"registerModal.registerAttention.acknowledged"} />
        </button>
      </ModalBottom>
    </Modal>;
  }
}
