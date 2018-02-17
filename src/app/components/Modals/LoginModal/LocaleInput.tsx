import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE } from "../../../constants/stores";
import { action, observable } from "mobx";
import { LocaleStore } from "../../../stores";
import { ChangeEventHandler } from "react";

interface LocaleInputProps {
  className?: string,
  type: string,
  placeholderTextId: string,
  onChange?: (e: ChangeEventHandler<HTMLInputElement>) => void
  required?: boolean,
  [STORE_LOCALE]?: LocaleStore
}

@inject(STORE_LOCALE)
@observer
export class LocaleInput extends React.Component<LocaleInputProps, any> {
  @observable value: string;

  @action handleChange = (e) => {
    this.value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {

    return <input className={this.props.className} type={this.props.type} value={this.value}
           placeholder={this.props[STORE_LOCALE].get(this.props.placeholderTextId) as string}
           onChange={this.handleChange} required={this.props.required}/>
  }
}