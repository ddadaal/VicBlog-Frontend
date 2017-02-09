import * as React from 'react';
import { Comment } from '../store/CommentPanel';

interface CommentItemProps {
    comment: Comment
};

export class CommentItem extends React.Component<CommentItemProps, void>{
    render(){
        return <div>
            {this.props.comment.username} says:<br/>
            {this.props.comment.content}
            </div>;
    }
}