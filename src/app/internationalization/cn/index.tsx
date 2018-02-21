import { Language } from "../index";
import * as React from "react";

export const cn: Language = {
  id: "zh-CN",
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
      frontend: "前端版本 {build}. 构建于 {buildTime}. 部署于 {frontendDeployment}."
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
      serverError: "服务器错误：",
      rememberMe: "记住我",
    },
    registerModal: {
      title: "注册",
      username: "用户名",
      password: "密码",
      pleaseInputUsername: "请输入用户名",
      pleaseInputPassword: "请输入密码",
      register: "注册",
      registering: "注册中……",
      close: "关闭",
      registerFailed: "注册失败",
      usernameConflict: "用户名已经被占用。请重新输入。",
      networkError: "网络错误，请检查网络连接。",
      serverError: "服务器错误：",
      complete: {
        congrats: "祝贺!",
        content: "注册完成！点击“登录”，以{username}的身份登录！",
        clickToLogin: "登录"
      },
      registerAttention: {
        link: "注册前读我！",
        fileName: "cn",
        title: "注册前请读",
        acknowledged: "了解了"
      }
    },
    articleList: {
      loading: "加载中",
      tags: "标签",
      createTime: "创建日期",
      lastEditedTime: "最近更新日期",
      likeCount: "喜欢数",
      commentCount: "评论数",
      author: "作者",
      dateFormat: "YYYY[年]M[月]D[日] HH:mm:ss ZZ"
    }
  }
};