import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE } from "../../constants/stores";
import { action } from "mobx";
import { LocaleStore } from "../../stores";
import { ChangeEventHandler } from "react";

interface LocaleInputProps {
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

@inject(STORE_LOCALE)
@observer
export class LocaleInput extends React.Component<LocaleInputProps, any> {
  @action handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    const locale = this.props[STORE_LOCALE];
    return <div>
      <label>
        <b>
          {locale.get(this.props.labelTextId)}
          &emsp;
          { this.props.invalid ? locale.get(this.props.invalidPromptId) : null }
        </b>
      </label>
      <input className={this.props.className} type={this.props.type} value={this.props.value}
             placeholder={locale.get(this.props.placeholderTextId) as string}
             onChange={this.handleChange} />
    </div>

  }
}