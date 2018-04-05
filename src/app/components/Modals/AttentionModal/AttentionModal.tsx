import React from "react";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import style from '../../style';
import { Modal, ModalBottom } from "../Modal";
import { LocaleMessage } from "../../../internationalization/components";
import { Dropdown } from "../../Common/Dropdown";
import { AttentionModalContent } from "./AttentionModalContent";
import { AttentionModalStore, LanguageSetting } from "./AttentionModalStore";
import { Inject } from "react.di";
import { LocaleStore } from "../../../stores/LocaleStore";


interface TermsModalProps {
  toggleModalShown: () => void;
}


@observer
export class AttentionModal extends React.Component<TermsModalProps, any> {

  @Inject localeStore: LocaleStore;
  
  private store: AttentionModalStore = new AttentionModalStore();
  @observable selectedLanguage: LanguageSetting = this.store.getLanguage(this.localeStore.currentLanguage.id);

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
