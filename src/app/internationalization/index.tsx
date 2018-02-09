export interface Language {
  id: string,
  name: string,
  languagePrompt: string,
  definitions: {
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
      deployedOn: string,
      frontendVersion: string,
      backendVersion: string,
    }
  }

}

export { cn } from './cn/index';
export { en } from './en/index';
