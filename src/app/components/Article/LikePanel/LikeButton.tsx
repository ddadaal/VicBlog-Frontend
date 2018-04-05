import React from "react";
import style from '../../style';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import { LocaleMessage } from "../../../internationalization/components";
import { LikeState } from "./";

interface LikeButtonProps {
  state: LikeState;
  likeCount: number;
  onClick: () => void;
}

interface ButtonConfig {
  icon: JSX.Element;
  disabled: boolean;
  textId: string;
}

const notLogin = {
  disabled: true,
  icon: <FaHeartO size={20}/>,
  textId: "article.like.notLogin.buttonText"
};

const notLiked = {
  disabled: false,
  icon: <FaHeartO size={20}/>,
  textId: "article.like.notLiked.buttonText"
};

const liked = {
  disabled: false,
  icon: <FaHeart size={20}/>,
  textId: "article.like.liked.buttonText"
};

const querying = {
  disabled: true,
  icon: <FaHeart size={20}/>,
  textId: "article.like.querying.buttonText"
};

const map = new Map<LikeState, ButtonConfig>();
map.set(LikeState.NotLogin, notLogin);
map.set(LikeState.NotLiked, notLiked);
map.set(LikeState.Liked, liked);
map.set(LikeState.Querying, querying);

export class LikeButton extends React.Component<LikeButtonProps, any> {

  render() {
    const config = map.get(this.props.state);

    return <button disabled={config.disabled} onClick={this.props.onClick}
                   className={style("w3-button", "w3-red","w3-card-4")}>
      {config.icon}&nbsp;<LocaleMessage id={config.textId}/>&emsp;{this.props.likeCount}
    </button>;
  }
}
