import * as React from "react";
import { LikeState } from "./index";
import { LikeButton } from "./LikeButton";
import * as localStyle from './style.css';
import { LocaleMessage } from "../../Common/Locale";

interface LikePanelProps {
  state: LikeState,
  likeButtonOnClick: () => void,
  loginButtonOnClick: () => void,
  likeCount: number
}


export class LikePanelComponent extends React.Component<LikePanelProps, any> {

  constructDescription() {

    switch (this.props.state) {
      case LikeState.NotLogin:
        return <LocaleMessage id={"article.like.notLogin.description"} replacements={{
          login: <span className={localStyle["login-link"]} onClick={this.props.loginButtonOnClick}>
                    <LocaleMessage id={"article.like.loginLink"}/>
                  </span>
        }}/>;

      case LikeState.NotLiked:
        return <LocaleMessage id={"article.like.notLiked.description"}/>;

      case LikeState.Liked:
        return <LocaleMessage id={"article.like.liked.description"}/>;
    }

  }


  render() {
    return <div className={localStyle.panel}>
      <LikeButton state={this.props.state} onClick={this.props.likeButtonOnClick} likeCount={this.props.likeCount}/>
      <p>
        {this.constructDescription()}
      </p>
    </div>

  }
}
