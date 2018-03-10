import * as React from "react";
import { ReactNode } from "react";
import { inject, observer } from "mobx-react";
import { LocaleStore } from "../LocaleStore";
import { LocaleStoreProps} from "..";
import { STORE_LOCALE } from "../../constants/stores";

interface LocalizeProps extends LocaleStoreProps { 
  children: (props) => ReactNode;
  [s: string]: ReactNode
}

@inject(STORE_LOCALE)
@observer
export class Localize extends React.Component<LocalizeProps, {}> {
  render() {
    const locale = this.props[STORE_LOCALE];
    const childProducer = this.props.children;
    const properties = Object.keys(this.props)
      .filter(x => x !== STORE_LOCALE && x !== "children")
      .reduce((obj, key) => ({ ...obj, [key]: locale.get(this.props[key] as string) }), {});
    return childProducer(properties);
  }
}
