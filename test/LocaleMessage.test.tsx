import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from 'chai';
import { LocaleStore } from "../src/app/stores";
import { en, cn, Language, LocaleMessage } from "../src/app/internationalization";
import { ComponentChildrenType } from "../src/app/stores/LocaleStore";
import * as React from 'react';


const partialLanguage: Language = {
  id: "partial",
  name: "partial",
  languagePrompt: "language prompt",
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
        // logout: "Logout",
      },
    },
  }
};

// @suite class LocaleMessageTest {
//   private store: LocaleStore = new LocaleStore([cn, partialLanguage], partialLanguage.id, cn.id);
//   private props = { locale: this.store };
//   @test test_existsInPartial() {
//     const expected = "Home";
//     const actual = <LocaleMessage id={"header.home"} locale={this.store} />;
//     expect(actual[0]).eq(expected);
//   }
//
//   @test test_notExistInPartial() {
//     const expected = "登出";
//     const actual = <LocaleMessage id={"header.navbarLogin.logout"} locale={this.store}/>;
//     expect(actual[0]).eq(expected);
//   }
//
//   @test test_stringReplacement() {
//     const expected = "Welcome, replaced";
//     const actual = <LocaleMessage id={"header.navbarLogin.loggedInPrompt"} locale={this.store}/>;
//     expect(actual).eq(expected);
//   }
//
// }