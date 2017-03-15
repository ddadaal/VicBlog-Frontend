import * as React from 'react';
import * as CommentState from '../../store/Comment';
import * as UserState from '../../store/User';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import MarkdownEditor from '../common/MarkdownEditor';
import { CommentItem } from './CommentItem';
import { CommentFetchMinutesSpan } from '../../Utils';
import { Button, Icon, notification, Alert } from 'antd';


type CommentPanelProps = typeof UserState.actionCreators & UserState.UserState & CommentState.CommentsState & typeof CommentState.actionCreators & { articleID: string };
class CommentPanel extends React.Component<CommentPanelProps, void>{


    constructor() {
        super();
    }

    componentDidMount() {

        const commentObject: CommentState.CommentsOfArticle = this.props.commentsOfArticles.get(this.props.articleID);

        if (!commentObject || Date.now() - commentObject.lastUpdatedTime > CommentFetchMinutesSpan * 60 * 1000) {
            this.props.requestAllComments(this.props.articleID);
        }

    }

    onContentChange(content: string) {
        this.props.changeContent(content);
    }

    deleteComment(commentID: string) {
        notification.info({
            message: "Deleting...",
            description: "Comment is being deleting...",
            duration: null
        });
        this.props.deleteComment(commentID, this.props.user.token, () => {
            notification.destroy();
            notification.success({
                message: "Deleted successfully!",
                description: "Your comment has been deleted!",
                duration: 3
            });
            this.props.requestAllComments(this.props.articleID);
        });
    }

    sendComment() {
        const payload: CommentState.SendCommentModel = {
            articleID: this.props.articleID,
            content: this.props.content,
            replyTo: ""
        };
        this.props.sendComment(this.props.user.token, payload, () => {
            this.props.requestAllComments(this.props.articleID);
            this.props.changeContent("");
        });

    }

    render() {
        const commentObject = this.props.commentsOfArticles.get(this.props.articleID);
        if (!commentObject) {
            return <div>
                <br />
                <br />
                <p>
                    <span style={{ fontSize: "large" }}><Icon type="inbox" /> Comments: </span>
                    <span style={{ float: "right" }}>
                        <a disabled>Refreshing...</a>
                    </span>
                </p>
                <Alert message="Loading..." type="info" />
            </div>;
        }


        const items = commentObject.comments
            ? commentObject.comments.map(item => <CommentItem comment={item} key={item.id} currentUser={this.props.user} deleteComment={commentID => this.deleteComment(commentID)} />)
            : [];
        return (
            <div>
                <br />
                <br />
                <p>
                    <span style={{ fontSize: "large" }}><Icon type="inbox" /> Comments: </span>
                    <span style={{ float: "right" }}>
                        {commentObject.fetchStatus != CommentState.FetchStatus.Requesting
                            ? <a onClick={() => this.props.requestAllComments(this.props.articleID)}>Refresh</a>
                            : <a disabled>Refreshing...</a>
                        }
                    </span>
                </p>
                {items}
                <br /><hr />
                {this.props.status == UserState.UserStatus.LoggedIn
                    ? <div>
                        <MarkdownEditor placeholder="Input your comment here. Markdown supported." content={this.props.content} onContentChange={content => this.onContentChange(content)} />
                        <Button type="primary" onClick={() => this.sendComment()} loading={this.props.sendStatus == CommentState.SendStatus.Sending}>Send</Button>
                    </div>
                    : <div>Wanna comment on this article? <a onClick={e => this.props.openLoginModal()}>Click to login! </a></div>}
            </div>
        );
    }
}

export default connect(
    (s: ApplicationState) => ({ ...s.comments, ...s.user }),
    { ...UserState.actionCreators, ...CommentState.actionCreators },
    (stateProps, dispatchProps, ownProps: any) => ({ ...stateProps, ...dispatchProps, articleID: ownProps.articleID }))(CommentPanel);