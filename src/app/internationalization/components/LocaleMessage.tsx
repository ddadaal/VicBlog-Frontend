import { inject, observer } from "mobx-react";
import * as React from "react";
import { ReactNode } from "react";
import { LocaleStoreProps } from "..";
import { STORE_LOCALE } from "../../constants/stores";


interface LocaleMessageProps extends LocaleStoreProps {
  id: string;
  replacements?: {[id:string] : ReactNode }

}

@inject(STORE_LOCALE)
@observer
export class LocaleMessage extends React.Component<LocaleMessageProps, any> {

  render() {
    const locale = this.props[STORE_LOCALE];
    return locale.get(this.props.id, this.props.replacements);
  }
}