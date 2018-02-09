import { Language } from "../index";
import * as React from "react";

export const en: Language = {
  id: "en",
  name: "English",
  languagePrompt: "Current Language: English. Click to change.",
  definitions: {
    header: {
      home: "Home",
      about: "About",
      articleList: "Articles",
      blogBrief: "VicBlog - A Personal Blog",
      navbarLogin: {
        notLoggedInPrompt: "Login",
        loggedInPrompt: "Welcome，{username}",
        composeNewArticle: "Compose New Article",
        logout: "Logout",
      },
    },
    footer: {
      codeProudlyByVicCrubs: "Coded Proudly by {viccrubs}",
      themedWith: "Themed with {w3css} and {fabric}",
      deployedOn: "Deployed on {githubPages} and {azure}",
      frontendVersion: "Frontend version: {version}. Built at {buildTime}",
      backendVersion: "Backend version: {version}. Built at {buildTime}"
    }
  }
};