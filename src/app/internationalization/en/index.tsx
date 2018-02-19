import { Language } from "../index";
import * as React from "react";

export const en: Language = {
  id: "en-US",
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
        loggedInPrompt: "Welcome, {username}",
        composeNewArticle: "Compose New Article",
        logout: "Logout",
      },
    },
    footer: {
      codeProudlyByVicCrubs: "Coded Proudly by {viccrubs}",
      themedWith: "Themed with {w3css} and {fabric}",
      frontend: "Frontend build {build}. Built at {buildTime}. Deployed on {frontendDeployment}."
    },
    loginModal: {
      title: "Login",
      username: "Username",
      password: "Password",
      pleaseInputUsername: "Please input Username",
      pleaseInputPassword: "Please input Password",
      login: "Login",
      loggingIn: "Logging in...",
      register: "Register",
      close: "Close",
      loginFailed: "Login failed.",
      wrongCredential: "Username/Password is not valid.",
      networkError: "Network error. Please check your network connection.",
      serverError: "Server responds with error(s):",
      rememberMe: "Remember me",
    },
    registerModal: {
      title: "Register",
      username: "Username",
      password: "Password",
      pleaseInputUsername: "Please input Username",
      pleaseInputPassword: "Please input Password",
      register: "Register",
      registering: "Registering...",
      close: "Close",
      registerFailed: "Register failed.",
      usernameConflict: "Username has been token. Please select another one.",
      networkError: "Network error. Please check your network connection.",
      serverError: "Server responds with error(s):",
      complete: {
        congrats: "Congratulations!",
        content: "You have just registered. Click \"Click to Login\" to login as {username}.",
        clickToLogin: "Click to Login"
      },
      registerAttention: {
        link: "READ ME BEFORE YOU REGISTER!",
        fileName: "en",
        title: "Read before register",
        acknowledged: "Acknowledged"
      }
    },
    articleList: {
      loading: "Loading..."
    }
  }
};