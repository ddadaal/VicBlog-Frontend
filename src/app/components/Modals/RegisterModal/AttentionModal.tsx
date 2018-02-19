import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE, STORE_USER } from "../../../constants/stores";
import { LocaleStore, UserStore } from "../../../stores";
import { action, observable, runInAction } from "mobx";
import { termsAndConditionsRoot } from "../../../constants/config";

import style from '../../style';
import { Modal, ModalBottom } from "../Modal";
import { LocaleMessage } from "../../../internationalization";
import { AsyncComponent } from "../../../routes/AsyncComponent";

interface TermsModalContentProps {
  [STORE_LOCALE]?: LocaleStore,
  content: string
}

const MarkdownIt = require("markdown-it");


export class AttentionModalContent extends React.Component<TermsModalContentProps, any> {
  render() {
    // loaded
    return <div dangerouslySetInnerHTML={{__html: this.props.content}}/>;
  };
}

interface TermsModalProps {
  toggleModalShown: () => void
}

@inject(STORE_LOCALE)
@observer
export class AttentionModal extends React.Component<TermsModalProps, any> {

  @action startLoading = async () => {
    const locale = this.props[STORE_LOCALE];
    const res = await import(`../../../../assets/registerAttention/${locale.get("registerModal.registerAttention.fileName")}.md`);

    const md = new MarkdownIt();
    const content = md.render(res);
    return <AttentionModalContent content={content}/>;
  };

  render() {
    return <Modal shown={true}
                  titleId={"registerModal.registerAttention.title"}
                  toggleShown={this.props.toggleModalShown}>
      <div className={style("w3-container")}>
        <AsyncComponent render={this.startLoading} componentWhenLoading={"Loading..."}/>
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