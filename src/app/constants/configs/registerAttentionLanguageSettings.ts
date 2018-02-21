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