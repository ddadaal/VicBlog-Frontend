import React from "react";
import FaCommentO from 'react-icons/lib/fa/comment-o';
import { LocaleMessage } from "../../../internationalization/components";

export class Header extends React.Component<any> {
  render() {
    return <p>
      <FaCommentO size={20}/>
      <span style={{marginLeft: "5px"}}>
        <b>
          <LocaleMessage id={"article.comment.title"}/>
        </b>
      </span>
    </p>
  }
}
