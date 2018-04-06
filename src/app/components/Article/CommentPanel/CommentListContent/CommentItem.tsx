import React from 'react';
import { Comment } from "../../../../models/Comment";
import { LocaleDate, LocaleMessage } from "../../../../internationalization/components";
import { Tooltip } from "../../../Common/Tooltip";
import * as localStyle from './style.css';
import { observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";
import { Spin } from "../../../Common/Spin";

interface Props {
  comment: Comment;
  onRemove: () => Promise<void>;
  refresh: () => void;
}

@observer
export class CommentItem extends React.Component<Props, {}> {


  @action remove = async () => {
    this.removing = true;
    await this.props.onRemove();
    runInAction(() => {
      this.removing = false;
    });
    this.props.refresh();
  };

  @observable removing: boolean = false;

  render() {
    const {comment} = this.props;
    return <div className={localStyle.commentItem}>
      <p>
        <strong>{comment.username}</strong>
        &emsp;
        <LocaleDate formatId={"article.comment.dateFormat"} input={comment.submitTime}/>
        {this.removing ? <Spin className={localStyle.removeCommentSign}/> :
          this.props.onRemove
            ?
            <Tooltip onClick={this.remove} className={localStyle.removeCommentSign}
                     afterTooltip={<span>x</span>}>
              <LocaleMessage id={"article.comment.removeComment"}/>
            </Tooltip>
            : null
        }
      </p>
      <p className={localStyle.commentContent}>
        {comment.content}
      </p>
      <hr/>
    </div>;
  }
}
