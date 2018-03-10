export interface Language {
  id: string,
  name: string,
  languagePrompt: string,
  definitionName: string
}


export const cn: Language = {
  id: "zh-CN",
  name: "简体中文",
  languagePrompt: "现在的语言：简体中文。点击切换语言。",
  definitionName: "cn"
};

export const en: Language = {
  id: "en-US",
  name: "English",
  languagePrompt: "Current Language: English. Click to change.",
  definitionName: "en"
};
