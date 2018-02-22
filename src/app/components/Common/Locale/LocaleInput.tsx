import { inject, observer } from "mobx-react";
import { STORE_LOCALE } from "../../../constants/stores";
import { LocaleStore } from "../../../stores";
import * as React from "react";
import { ChangeEventHandler } from "react";

interface LocaleInputProps {
  [STORE_LOCALE]?: LocaleStore,
  value: string,
  onChange: (e: ChangeEventHandler<HTMLInputElement>) => void,
  placeholderTextId: string,
  className?: string,
  type: string
}

@inject(STORE_LOCALE)
@observer
export class LocaleInput extends React.Component<LocaleInputProps, any> {

  handleInput = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {

    const locale = this.props[STORE_LOCALE];
    return <input type={this.props.type} className={this.props.className}
                  placeholder={locale.get(this.props.placeholderTextId) as string}
                  value={this.props.value}
                  onChange={this.handleInput}/>;
  }
}