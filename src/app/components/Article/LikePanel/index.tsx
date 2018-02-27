import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_UI, STORE_USER } from "../../../constants/stores";
import { UiStore, UserStore } from "../../../stores";
import { action, computed, observable, runInAction } from "mobx";
import { Article } from "../../../models";
import { APIs } from "../../../api/ApiDefinition";
import { HttpMethod, NetworkStore } from "../../../stores/NetworkStore";
import { LikePanelComponent } from "./LikePanelComponent";

interface LikePanelContainerProps {
  article: Article;
  [STORE_USER]?: UserStore;
  [STORE_UI]?: UiStore

}

export const enum LikeState { // to use it as a key of a map
  NotLogin, NotLiked, Liked
}


@inject(STORE_USER,STORE_UI)
@observer
export class LikePanel extends React.Component<LikePanelContainerProps, any> {

  @observable likeCount: number = 0;
  @observable iLiked: boolean = false;

  get articleId() {
    return this.props.article.id;
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
    const url = NetworkStore.appendQueryString(APIs.like, {articleId: this.articleId});
    const {statusCode, ok, error, isNetworkError, response} = await NetworkStore.fetch(url);
    if (ok) {
      runInAction(() => {
        this.likeCount = response;
      });
    }
  }

  @action async fetchLikeStatus() {

    const url = APIs.didLike;
    const {statusCode, ok, error, isNetworkError, response} = await NetworkStore.fetch(url, HttpMethod.GET, null, this.token);

    if (ok) {
      runInAction(() => {
        this.iLiked = response;
      })
    }
  }

  @action async dislike() {
    this.iLiked = false; // optimistic update
    const url = NetworkStore.appendQueryString(APIs.like, {articleId: this.articleId});
    const {ok, response} = await NetworkStore.fetch(url, HttpMethod.DELETE, null, this.token);
    if (ok) {
      runInAction(() => {
        this.likeCount = response;
      });

    }
  }

  @action async like() {
    this.iLiked = true;
    const url = NetworkStore.appendQueryString(APIs.like, {articleId: this.articleId});
    const {statusCode, ok, error, isNetworkError, response} = await NetworkStore.fetch(url, HttpMethod.POST, null, this.token);
    if (ok) {
      runInAction(() => {
        this.likeCount = response;
      });
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