import { Language } from "../index";
import * as React from "react";

export const cn: Language = {
  id: "cn",
  name: "简体中文",
  languagePrompt: "现在的语言：简体中文。点击切换语言。",
  definitions: {
    header: {
      home: "主页",
      about: "关于",
      articleList: "文章列表",
      blogBrief: "VicBlog - 一个个人博客",
      navbarLogin: {
        notLoggedInPrompt: "登录",
        loggedInPrompt: "欢迎，{username}",
        composeNewArticle: "写新文章",
        logout: "登出",
      },
    },
    footer: {
      codeProudlyByVicCrubs: "由 {viccrubs} 强力编写",
      themedWith: "由 {w3css} 和 {fabric} 强势驱动",
      deployedOn: "部署于 {githubPages} 和 {azure}",
      frontendVersion: "前端版本：{version}，构建时间：{buildTime}",
      backendVersion: "后端版本：{version}，构建时间：{buildTime}"
    }
  }
};