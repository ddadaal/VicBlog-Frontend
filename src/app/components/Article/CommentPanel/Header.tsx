import React from "react";
import FaCommentO from 'react-icons/lib/fa/comment-o';
import { LocaleMessage } from "../../../internationalization/components";

export class Header extends React.Component<any> {
  render() {
    return <h3>
      <FaCommentO size={28}/>
      <span style={{marginLeft: "5px"}}>
        <b>
          <LocaleMessage id={"article.comment.title"}/>
        </b>
      </span>
    </h3>
  }
}
