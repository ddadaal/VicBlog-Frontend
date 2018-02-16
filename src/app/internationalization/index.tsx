interface LanguageDefinition {
  header?: {
    home?: string,
    about?: string,
    blogBrief?: string,
    articleList?: string,
    navbarLogin?: {
      notLoggedInPrompt?: string,
      loggedInPrompt?: string,
      composeNewArticle?: string,
      logout?: string,
    },
  },
  footer?: {
    codeProudlyByVicCrubs?: string,
    themedWith?: string,
    deployedOn?: string,
    frontendVersion?: string,
    backendVersion?: string,
  },
  loginModal?: {
    title?: string,
    username?: string,
    password?: string,
    pleaseInputUsername?: string,
    pleaseInputPassword?: string,
    login?: string,
    loggingIn?: string,
    register?: string,
    close?: string,
    loginFailed?: string,
    wrongCredential?: string,
    networkError?: string,
    serverError?: string
  }
}

export interface Language {
  id: string,
  name: string,
  languagePrompt: string,
  definitions: LanguageDefinition
}


export { cn } from './cn/index';
export { en } from './en/index';
export { LocaleMessage } from './LocaleMessage';