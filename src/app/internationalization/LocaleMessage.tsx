import { STORE_LOCALE } from "../constants/stores";
import { LocaleStore } from "../stores";
import * as React from "react";
import { inject, observer } from "mobx-react";
import { ComponentChildrenType } from "../stores/LocaleStore";
import { cloneElement } from "react";


interface LocaleMessageProps {
  [STORE_LOCALE]?: LocaleStore,
  id: string,
  replacements?: {[s:string] : ComponentChildrenType }

}

const idSeparator = '.';

@inject(STORE_LOCALE)
@observer
export class LocaleMessage extends React.Component<LocaleMessageProps, any> {


  format = (content: string, replacements?: {[s: string]: ComponentChildrenType}) : Array<ComponentChildrenType> => {
    const splitter = /({[0-9a-zA-Z]+})/;
    let array = content.split(splitter);
    let newArray = array as Array<ComponentChildrenType>;
    if (replacements) {
      for (let i =1;i<array.length;i+=2) {
        const tag = array[i].substr(1,array[i].length-2);
        if (replacements[tag]) {
          if (React.isValidElement(replacements[tag])) {
            newArray[i] = cloneElement(replacements[tag] as JSX.Element, { key: i}); // clones the element and set key props
          } else {
            newArray[i] = replacements[tag];
          }
        }
      }
    }
    return newArray;
  };

  retrieveDefinition = (id: string) => {
    const locale = this.props[STORE_LOCALE];
    const splitted = id.split(idSeparator);
    let content = locale.definitions as any;
    const callHistory = [];
    for (const key of splitted) {
      if (key in content) {
        // record the key.
        callHistory.push(key);
        content = content[key];
      } else {
        // fallback occurs.
        // redo the call history on fallback history.
        let fallbackContent = locale.fallbackLanguage.definitions;
        for (const historyKey of callHistory) {
          fallbackContent = fallbackContent[historyKey];
        }
        content = fallbackContent[key];
      }
    }
    return content;
  };



  render() {
    const definition = this.retrieveDefinition(this.props.id);
    const replaced = this.format(definition, this.props.replacements);
    return replaced;
  }
}