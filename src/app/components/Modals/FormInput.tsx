import * as React from "react";
import { ChangeEventHandler } from "react";
import { STORE_LOCALE } from "../../constants/stores";
import { action } from "mobx";
import { LocaleStore } from "../../stores";
import { LocaleMessage } from "../Common/Locale";
import { Localize } from "../Common/Locale/Localize";

interface FormInputProps {
  className: string,
  type: string,
  placeholderTextId: string,
  labelTextId: string,
  invalid: boolean,
  invalidPromptId: string,
  onChange: (e: ChangeEventHandler<HTMLInputElement>) => void,
  value: string,
  [STORE_LOCALE]?: LocaleStore
}

export class FormInput extends React.Component<FormInputProps, any> {
  @action handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    return <div>
      <label>
        <b>
          <LocaleMessage id={this.props.labelTextId}/>
          &emsp;
          { this.props.invalid ? <LocaleMessage id={this.props.invalidPromptId}/> : null }
        </b>
      </label>
      <Localize placeholder={this.props.placeholderTextId}>
        {(props) => <input className={this.props.className} type={this.props.type}
               value={this.props.value} onChange={this.handleChange} {...props}/>}
      </Localize>
    </div>

  }
}