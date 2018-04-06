import React from "react";
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaRefresh from 'react-icons/lib/fa/refresh';

import { LocaleMessage } from "../../../internationalization/components";
import * as localStyle from './style.css';
import { Spin } from "../../Common/Spin";
import { Tooltip } from "../../Common/Tooltip";

interface Props {
  totalContent: number;

  refresh(): void;

  refreshing: boolean;
}

export class Header extends React.Component<Props> {
  render() {
    return <h3 className={localStyle.parent}>
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
      <span>
      <small className={localStyle.refreshButton}>
        {this.props.refreshing
          ? <Spin/>
          : <Tooltip afterTooltip={<span onClick={this.props.refresh}><FaRefresh/></span>}>
            <LocaleMessage id={"article.comment.refresh"}/>
          </Tooltip>
        }
      </small>
      </span>
    </h3>
  }
}
