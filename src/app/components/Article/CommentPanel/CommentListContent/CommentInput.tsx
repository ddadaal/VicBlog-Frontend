import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../../stores";
import { LocaleMessage, Localize } from "../../../../internationalization/components";
import style from '../../../style';
import { action, computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as localStyle from './style.css';

interface Props {
  submit: (content: string) => Promise<void>;
  refresh: () => void;
}

@observer
export class CommentInput extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  @observable content: string = "";
  @observable submitting: boolean;

  @computed get submittable() {
    if (this.submitting) { return false; }
    if (!this.props.submit) { return false; }
    return this.content.length != 0;

  }

  @action onContentChanged = (e) => {
    this.content = e.target.value;
  };

  @action onSubmit = async () => {
    this.submitting = true;
    await this.props.submit(this.content);
    runInAction(() => {
      this.submitting = false;
      this.content = "";
      this.props.refresh();
    })
  };


  render() {
    return <div>
      <Localize replacements={{
        placeholder: "article.comment.inputPlaceholder",
        submit: "article.comment.submit",
        loginRequired: "article.comment.loginRequired"
      }}>
        {props => <>
          <textarea className={localStyle.inputField}
                    placeholder={props.placeholder}
                    value={this.content}
                    wrap={"hard"}
                    onChange={this.onContentChanged}
                    disabled={!this.props.submit}
          />
          <p>
            <button className={style("w3-btn", "w3-blue")}
                  onClick={this.onSubmit} disabled={!this.submittable}
          >
              {this.props.submit ? props.submit : props.loginRequired }
          </button>

          </p>
        </>}
      </Localize>
    </div>;
  }
}
