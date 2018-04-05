import React from "react";
import { observer } from "mobx-react";
import { action, computed, observable, runInAction } from "mobx";
import { Article } from "../../../models";
import { LikePanelComponent } from "./LikePanelComponent";
import { LikeService } from "../../../api/LikeService";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { UiStore } from "../../../stores/UiStore";
import { ArticleListStore } from "../../../stores/ArticleListStore";

interface LikePanelContainerProps {
  article: Article;
}



export const enum LikeState { // to use it as a key of a map
  NotLogin, NotLiked, Liked
}

@observer
export class LikePanel extends React.Component<LikePanelContainerProps, any> {

  @observable likeCount: number = 0;
  @observable iLiked: boolean = false;

  @Inject userStore: UserStore;
  @Inject uiStore: UiStore;
  @Inject articleListStore: ArticleListStore;

  @Inject likeService: LikeService;

  get articleId() {
    return this.props.article.articleId;
  }

  get token() {
    return this.userStore.token;
  }

  @computed get likeState() {
    if (!this.userStore.loggedIn) {
      return LikeState.NotLogin;
    } else if (this.iLiked) {
      return LikeState.Liked;
    } else {
      return LikeState.NotLiked;
    }
  }

  @action update() {
    this.fetchLikeCount();
    if (this.userStore.loggedIn) {
      this.fetchLikeStatus();
    }
  }

  @action async fetchLikeCount() {
    try {
      const count = await this.likeService.fetchLikeCount(this.props.article.articleId);
      runInAction(() => {
        this.likeCount = count;
      });
    } catch (e) {

    }
  }

  @action async fetchLikeStatus() {
    try {
      const result = await this.likeService.fetchLikeStatus(this.props.article.articleId, this.token);
      runInAction(() => {
        this.iLiked = result
      });
    } catch (e) {

    }
  }

  @action async dislike() {
    this.iLiked = false; // optimistic update
    try {
      const newCount = await this.likeService.unlike(this.props.article.articleId, this.token);
      runInAction(() => {
        this.likeCount = newCount;
        // this.props[STORE_ARTICLE_LIST].completeRefetch();
      });
    } catch (e) {

    }
  }

  @action async like() {
    this.iLiked = true;
    try {
      const newCount = await this.likeService.like(this.props.article.articleId, this.token);
      runInAction(() => {
        this.likeCount = newCount;
        // this.props[STORE_ARTICLE_LIST].completeRefetch();
      });
    } catch (e) {

    }
  }

  likeButtonClick = () => {
    if (this.iLiked) {
      this.dislike();
    } else {
      this.like();
    }
  };

  loginButtonOnClick = () => {
    this.uiStore.toggleLoginModalShown();
  };

  componentDidMount() {
    this.update();
  }

  render() {
    return <LikePanelComponent
      likeCount={this.likeCount}
      likeButtonOnClick={this.likeButtonClick}
      loginButtonOnClick={this.loginButtonOnClick}
      state={this.likeState} />;
  }
}
