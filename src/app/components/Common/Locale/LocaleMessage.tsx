import { STORE_LOCALE } from "../../../constants/stores";
import { LocaleStore } from "../../../stores";
import { ComponentChildrenType } from "../../../stores/LocaleStore";
import { inject, observer } from "mobx-react";
import * as React from "react";


interface LocaleMessageProps {
  [STORE_LOCALE]?: LocaleStore,
  id: string,
  replacements?: {[id:string] : ComponentChildrenType }

}

@inject(STORE_LOCALE)
@observer
export class LocaleMessage extends React.Component<LocaleMessageProps, any> {

  render() {
    const locale = this.props[STORE_LOCALE];
    return locale.get(this.props.id, this.props.replacements);
  }
}