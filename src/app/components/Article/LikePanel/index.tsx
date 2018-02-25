import * as React from "react";
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../../constants/stores";
import { UserStore } from "../../../stores";
import { LikeButton } from "./LikeButton";

interface LikePanelProps {
  likes: number,
  [STORE_USER]?: UserStore
}

@inject(STORE_USER)
@observer
export class LikePanel extends React.Component<LikePanelProps, any> {
  render() {
    const user = this.props[STORE_USER];
    return <LikeButton disabled={!user.loggedIn}/>
  }
}