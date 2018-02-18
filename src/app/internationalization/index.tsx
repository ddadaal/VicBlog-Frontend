type LanguageDefinition = {
  header: {
    home: string,
    about: string,
    blogBrief: string,
    articleList: string,
    navbarLogin: {
      notLoggedInPrompt: string,
      loggedInPrompt: string,
      composeNewArticle: string,
      logout: string,
    },
  },
  footer: {
    codeProudlyByVicCrubs: string,
    themedWith: string,
    frontend: string,
  },
  loginModal: {
    title: string,
    username: string,
    password: string,
    pleaseInputUsername: string,
    pleaseInputPassword: string,
    login: string,
    loggingIn: string,
    register: string,
    close: string,
    loginFailed: string,
    wrongCredential: string,
    networkError: string,
    serverError: string,
    rememberMe: string,
  },
  registerModal: {
    title: string,
    username: string,
    password: string,
    pleaseInputUsername: string,
    pleaseInputPassword: string,
    register: string,
    registering: string,
    close: string,
    registerFailed: string,
    usernameConflict: string,
    networkError: string,
    serverError: string,
    complete: {
      congrats: string,
      content: string,
      clickToLogin: string
    },
    registerAttention: {
      link: string,
      fileName: string,
      title: string,
      acknowledged: string
    }
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