import * as React from 'react';
import { Comment } from '../../store/CommentPanel';
import { Link } from 'react-router';
import moment from 'moment';
import { Popconfirm, Icon } from 'antd';
import { MarkdownDisplay } from '../common';


interface CommentItemProps {
  comment: Comment,
  currentUser: User,
  deleteComment: (commentID: string) => any
};

export class CommentItem extends React.Component<CommentItemProps, void>{
  render() {
    const floatRight = { float: "right" };
    return <div>
      <hr />

      <Link to={`/users/${this.props.comment.username}`}>
        {this.props.comment.username}
      </Link>:<br />
      <MarkdownDisplay content={this.props.comment.content}/>
      <p>
        <small>at {moment.utc(this.props.comment.submitTime).local().format("MMM Do, YYYY, HH:mm:ss")}</small>
        <span style={floatRight}>
          {this.props.currentUser && this.props.currentUser.username == this.props.comment.username 
          ? <Popconfirm title="Delete this comment?" onConfirm={() => this.props.deleteComment(this.props.comment.id)}><a><Icon type="delete" />Delete</a></Popconfirm>
          : []}
        </span>
      </p>
    </div>;
  }
}