import { apiServiceProviders } from "./ApiServiceProviders";
import { ArticleListStore, ArticleStore, LocaleStore, RouterStore, UiStore, UserStore } from "../stores";
import { HomepageStore } from "../stores/HomepageStore";

export async function initProviders(history) {
  const userStore = new UserStore();
  const routerStore = new RouterStore(history);
  const localeStore = new LocaleStore();
  const uiStore = new UiStore();

  await localeStore.init();

  return [
    { provide: RouterStore, useValue: routerStore },
    { provide: UserStore, useValue: userStore},
    { provide: UiStore, useValue: uiStore },
    { provide: LocaleStore, useValue: localeStore },
    { provide: ArticleListStore, useClass: ArticleListStore},
    { provide: ArticleStore, useClass: ArticleStore},
    { provide: HomepageStore, useClass: HomepageStore},
    ...apiServiceProviders
  ]

}
