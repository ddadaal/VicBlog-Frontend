export type LanguageDefinition = {
  header: {
    home: string,
    about: string,
    blogBrief: string,
    articleList: string,
    languageSwitchingTo: string,
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
    dateFormat: string
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
  articleList: {
    loading: string,
    tags: string,
    createTime: string,
    lastEditedTime: string,
    likeCount: string,
    commentCount: string,
    author: string,
    dateFormat: string,
    filter: {
      title: string,
      textsInTitle: string,
      tags: string,
      createTimeRange: string,
      minLikes: string
    }
  },
  article: {
    loading: string,
    dateFormat: string,
    tags: string,
    createTime: string,
    lastEditedTime: string,
    likeCount: string,
    commentCount: string,
    author: string,
    backToTop: string
  }
}

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