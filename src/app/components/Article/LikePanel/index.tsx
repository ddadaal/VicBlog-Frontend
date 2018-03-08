import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_ARTICLE_LIST, STORE_UI, STORE_USER } from "../../../constants/stores";
import { ArticleListStore, UiStore, UserStore } from "../../../stores";
import { action, computed, observable, runInAction } from "mobx";
import { Article } from "../../../models";
import { LikePanelComponent } from "./LikePanelComponent";
import { LikeService } from "../../../api/LikeService";
import { ArticleListStoreProps } from "../../../stores/ArticleListStore";

interface LikePanelContainerProps {
  article: Article;
  [STORE_USER]?: UserStore;
  [STORE_UI]?: UiStore;
  [STORE_ARTICLE_LIST]?: ArticleListStore;

}



export const enum LikeState { // to use it as a key of a map
  NotLogin, NotLiked, Liked
}


@inject(STORE_USER,STORE_UI, STORE_ARTICLE_LIST)
@observer
export class LikePanel extends React.Component<LikePanelContainerProps, any> {

  @observable likeCount: number = 0;
  @observable iLiked: boolean = false;
  private readonly service = new LikeService(this.props.article.articleId);

  get articleId() {
    return this.props.article.articleId;
  }

  get token() {
    return this.props[STORE_USER].token;
  }

  @computed get likeState() {
    const user = this.props[STORE_USER];
    if (!user.loggedIn) {
      return LikeState.NotLogin;
    } else if (this.iLiked) {
      return LikeState.Liked;
    } else {
      return LikeState.NotLiked;
    }
  }

  @action update() {
    this.fetchLikeCount();
    if (this.props[STORE_USER].loggedIn) {
      this.fetchLikeStatus();
    }
  }

  @action async fetchLikeCount() {
    try {
      const count = await this.service.fetchLikeCount();
      runInAction(() => {
        this.likeCount = count;
      });
    } catch (e) {

    }
  }

  @action async fetchLikeStatus() {
    try {
      const result = await this.service.fetchLikeStatus(this.token);
      runInAction(() => {
        this.iLiked = result
      });
    } catch (e) {

    }
  }

  @action async dislike() {
    this.iLiked = false; // optimistic update
    try {
      const newCount = await this.service.unlike(this.token);
      runInAction(() => {
        this.likeCount = newCount;
        this.props[STORE_ARTICLE_LIST].completeRefetch();
      });
    } catch (e) {

    }
  }

  @action async like() {
    this.iLiked = true;
    try {
      const newCount = await this.service.like(this.token);
      runInAction(() => {
        this.likeCount = newCount;
        this.props[STORE_ARTICLE_LIST].completeRefetch();
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
    this.props[STORE_UI].toggleLoginModalShown();
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
