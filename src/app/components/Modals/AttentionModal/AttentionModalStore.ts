export interface LanguageSetting {
  id: string,
  name: string,
  filename: string
}


export const registerAttentionLanguageSettings: LanguageSetting[] = [
  {
    "id": "zh-CN",
    "name": "简体中文",
    "filename": "cn"
  },
  {
    "id": "en-US",
    "name": "English",
    "filename": "en"
  },
  {
    "id": "fallback",
    "name": "",
    "filename": "en"
  }
];

export class AttentionModalStore {

  readonly languages: Map<string, LanguageSetting> = new Map();
  readonly fallbackLanguage: LanguageSetting;

  constructor() {
    for (const item of registerAttentionLanguageSettings) {
      if (item.id !== "fallback") {
        this.languages.set(item.id, item);
      } else {
        this.fallbackLanguage = item;
      }
    }
  }

  getLanguage(id: string) {
    if (this.languages.has(id)) {
      return this.languages.get(id);
    } else {
      return this.fallbackLanguage;
    }
  }

  get allLanguages() {
    return Array.from(this.languages.values());
  }
}