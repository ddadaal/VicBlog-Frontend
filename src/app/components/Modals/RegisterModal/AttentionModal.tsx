import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE, STORE_USER } from "../../../constants/stores";
import { LocaleStore, UserStore } from "../../../stores";
import { action, observable, runInAction } from "mobx";
import { termsAndConditionsRoot } from "../../../constants/config";

import style from '../../style';
import { Modal, ModalBottom } from "../Modal";
import { LocaleMessage } from "../../../internationalization";

interface TermsModalContentProps {
  [STORE_LOCALE]?: LocaleStore
}

const MarkdownIt = require("markdown-it");

enum LoadingStatus {
  Standby, Loading, Loaded
}

@inject(STORE_LOCALE)
@observer
export class AttentionModalContent extends React.Component<TermsModalContentProps, any> {

  @observable loadingStatus = LoadingStatus.Standby;

  content: string = null;

  @action startLoading = async () => {
    this.loadingStatus = LoadingStatus.Loading;
    const locale = this.props[STORE_LOCALE];
    const res = await import(`../../../../assets/registerAttention/${locale.get("registerModal.registerAttention.fileName")}.md`);

    const md = new MarkdownIt();
    this.content = md.render(res);
    runInAction("Register Attention loaded", () =>{
      this.loadingStatus = LoadingStatus.Loaded;
    });
  };

  render() {
    switch (this.loadingStatus) {
      case LoadingStatus.Standby:
        this.startLoading();
        return "Loading...";
      case LoadingStatus.Loading:
        return "Loading...";
    }
    // loaded
    return <div dangerouslySetInnerHTML={{__html: this.content}}/>;
  };
}

interface TermsModalProps {
  toggleModalShown: () => void
}

export class AttentionModal extends React.Component<TermsModalProps, any> {
  render() {
    return <Modal shown={true}
                  titleId={"registerModal.registerAttention.title"}
                  toggleShown={this.props.toggleModalShown}>
      <div className={style("w3-container")}>
        <AttentionModalContent/>
      </div>
      <ModalBottom>
        <button onClick={this.props.toggleModalShown} type="button"
                className={style("w3-button", "w3-blue", "w3-right", "w3-padding")}>
          <LocaleMessage id={"registerModal.registerAttention.acknowledged"}/>
        </button>
      </ModalBottom>
  </Modal>;
  }
}