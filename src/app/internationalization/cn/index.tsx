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
    },
    loginModal: {
      title: "登录",
      username: "用户名",
      password: "密码",
      pleaseInputUsername: "请输入用户名",
      pleaseInputPassword: "请输入密码",
      login: "登录",
      loggingIn: "登录中……",
      register: "注册",
      close: "关闭",
      loginFailed: "登录失败",
      wrongCredential: "用户名和（或）密码无效。",
      networkError: "网络错误，请检查网络连接。",
      serverError: "服务器错误："
    }
  }
};