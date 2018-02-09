import { cn, en, Language } from "../internationalization";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { cloneElement } from "react";

export type ComponentChildrenType = string | JSX.Element;

export class LocaleStore {
  private availableTranslations: {[s: string]: Language};
  @observable currentLanguage: Language;

  @computed get definition() {
    return this.currentLanguage.definitions;
  }

  get allLanguages() {
    return Object.keys(this.availableTranslations).map(x => this.availableTranslations[x]);
  }

  constructor(translations: Language[], defaultTranslationId? : string) {
    this.availableTranslations = translations.reduce((obj, cur) => { return { ...obj, [cur.id]: cur }; }, {});
    this.currentLanguage = this.availableTranslations[defaultTranslationId ? defaultTranslationId : 0];
  }

  public format = (content: string, replacements?: {[s: string]: ComponentChildrenType}) : Array<ComponentChildrenType> => {
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


  @action public changeLanguage = (id: string) => {
    this.currentLanguage = this.availableTranslations[id];
  };

  @action public tempToggleLanguage = () => {
    this.changeLanguage(this.currentLanguage.id === 'cn' ? 'en' : 'cn');
  }
}