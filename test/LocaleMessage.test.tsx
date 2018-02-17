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
    footer: {
      codeProudlyByVicCrubs: "由 {viccrubs} 强力编写",
    }
  }
};

@suite class LocaleMessageTest {
  private store: LocaleStore = new LocaleStore([cn, partialLanguage], partialLanguage.id, cn.id);
  @test test_existsInPartial() {
    const expected = "Home";
    const actual = this.store.get("header.home");
    expect(actual).eq(expected);
  }

  @test test_notExistInPartial() {
    const expected = "登出";
    const actual = this.store.get("header.navbarLogin.logout");
    expect(actual).eq(expected);
  }

  @test test_stringReplacement() {
    const expected = "Welcome, replaced";
    const actual = this.store.get("header.navbarLogin.loggedInPrompt", {username: "replaced"});
    expect(actual).eq(expected);
  }

  @test test_elementReplacement() {
    const expected = [ "由 ", <a key={1}/>, " 强力编写"];
    const actual = this.store.get("footer.codeProudlyByVicCrubs", {viccrubs: <a/>});
    expect(actual).deep.eq(expected);
  }

}