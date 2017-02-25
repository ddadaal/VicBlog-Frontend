import * as React from 'react';
import { Comment } from '../store/CommentPanel';
import { User } from '../store/User';
import { Link } from 'react-router';
import moment from 'moment';
import { Popconfirm, Icon } from 'antd';
import "../assets/github-markdown.css";
const hljs = require('highlight.js');
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) { }
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) { }

    return ''; // use external default escaping
  }
});

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
      <div className="markdown-body"  dangerouslySetInnerHTML={{ __html: md.render(this.props.comment.content) }} />
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