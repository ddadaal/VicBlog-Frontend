import { cn, en, Language } from "../internationalization";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { cloneElement } from "react";
import { STORE_LOCALE } from "../constants/stores";

export type ComponentChildrenType = string | JSX.Element;

const idSeparator = '.';

export class LocaleStore {
  private availableLanguages: Map<string ,Language>;

  @observable currentLanguage: Language;
  @observable fallbackLanguage: Language;

  @computed get definitions() {
    return this.currentLanguage.definitions;
  }


  @computed get allLanguages(): Language[] {
    return Array.from(this.availableLanguages.values());
  }


  constructor(availableLanguages: Language[], defaultLanguageId : string, fallbackLanguageId: string) {
    this.availableLanguages = new Map();
    for (const l of availableLanguages) {
      this.availableLanguages.set(l.id, l);
    }


    this.fallbackLanguage = this.availableLanguages.get(fallbackLanguageId);

    this.currentLanguage = this.availableLanguages.has(defaultLanguageId)
      ? this.availableLanguages.get(defaultLanguageId)
      : this.fallbackLanguage;

  }

  public get = (id: string, replacements?: {[s: string]: ComponentChildrenType}) : Array<ComponentChildrenType> | string => {
    const definition = this.retrieveDefinition(id);
    return this.format(definition, replacements);
  };

  private format = (content: string, replacements?: {[s: string]: ComponentChildrenType}) : Array<ComponentChildrenType> | string => {
    const splitter = /({[0-9a-zA-Z]+})/;
    let array = content.split(splitter);
    let newArray = array as Array<ComponentChildrenType>;
    let elementReplaced = false;
    if (replacements) {
      for (let i =1;i<array.length;i+=2) {
        const tag = array[i].substr(1,array[i].length - 2);
        if (replacements[tag]) {
          if (React.isValidElement(replacements[tag])) {
            elementReplaced = true;
            newArray[i] = cloneElement(replacements[tag] as JSX.Element, { key: i }); // clones the element and set key props
          } else {
            newArray[i] = replacements[tag];
          }
        }
      }
    }

    if (elementReplaced) {
      return newArray;
    } else {
      return newArray.join("");
    }

  };

  private retrieveDefinition = (id: string) => {
    let content = this.definitions as any;
    let fallbackContent = this.fallbackLanguage.definitions;
    let onFallback = false;
    for (const key of id.split(idSeparator)) {
      if (key in content) {
        if (!onFallback) {
          fallbackContent = fallbackContent[key];
        }
        content = content[key];
      } else {
        // fallback occurs.
        // redirect the content to fallback
        content = fallbackContent[key];
        onFallback = true;
      }
    }
    return content;
  };


  @action public changeLanguage = (id: string) => {
    this.currentLanguage = this.availableLanguages.get(id);
  };
}