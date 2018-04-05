import { Article } from "../models";
import moment from 'moment';
import { ArticleService } from "../api/ArticleService";
import { Inject, Injectable } from "react.di";

export interface FetchedArticle {
  fetchTime: moment.Moment,
  article: Article
}


const refetchTimeThresholdMinutes = 120;

function needRefetch(date: moment.Moment) {
  return moment().diff(date, "minutes") > refetchTimeThresholdMinutes;
}

@Injectable
export class ArticleStore {

  constructor(@Inject private articleService: ArticleService) { }

  fetchedArticles: Map<number, FetchedArticle> = new Map();

  async fetchArticle(id: number): Promise<FetchedArticle> {
    if (this.fetchedArticles.has(id)) {
      const article = this.fetchedArticles.get(id);
      if (!needRefetch(article.fetchTime)) {
        return article;
      }
    }

    // fetch from backend
    const article = { article: await this.articleService.fetchArticle(id), fetchTime: moment()};
    this.fetchedArticles.set(id, article);
    return article;

  }

}
