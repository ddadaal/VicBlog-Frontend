import React from "react";
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaRefresh from 'react-icons/lib/fa/refresh';

import { LocaleMessage } from "../../../internationalization/components";
import * as localStyle from './style.css';
import { Spin } from "../../Common/Spin";
import { Tooltip } from "../../Common/Tooltip";
import { RefreshButton } from "../../Common/RefreshButton";
import { FetchStatus } from "../../../stores/common";

interface Props {
  totalContent: number;
  refresh(): void;
  refreshing: boolean;
}

export class Header extends React.Component<Props> {
  render() {
    return <>
      <FaCommentO size={28}/>
      <span>
        <b>
          <LocaleMessage id={"article.comment.title"}/>
        </b>
      </span>
      <span>
        <small>
        <LocaleMessage id={"article.comment.commentCount"} replacements={{
          count: this.props.totalContent + ""
        }}/>
        </small>
      </span>
      <RefreshButton refresh={this.props.refresh}
                     refreshing={this.props.refreshing}
                     floatRight={true}
      />
    </>
  }
}
