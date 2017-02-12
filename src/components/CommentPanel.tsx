import * as React from 'react';
import * as CommentState from '../store/CommentPanel';
import * as UserState from '../store/User';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { MarkdownEditor } from './MarkdownEditor';
import { CommentItem } from './CommentItem';
import { Button, Icon } from 'antd';


type CommentPanelProps = typeof UserState.actionCreators & UserState.UserState & CommentState.CommentPanelState & typeof CommentState.actionCreators & { articleID: number };
interface CommentPanelStates {
    content: string
}

class CommentPanel extends React.Component<CommentPanelProps, CommentPanelStates>{


    constructor() {
        super();
        this.state = {
            content: ""
        };
    }

    clearContent() {
        this.setState({
            content: ""
        });
    }

    componentDidMount() {
        this.props.requestAllComments(this.props.articleID);
    }

    onContentChange(content: string) {
        this.setState({
            content: content
        });
    }

    deleteComment(commentID: number){
        this.props.deleteComment(commentID,this.props.user.token,()=>{this.props.requestAllComments(this.props.articleID)});
    }

    sendComment() {
        const payload: CommentState.SendCommentModel = {
            articleID: this.props.articleID,
            content: this.state.content,
            token: this.props.user.token,
            replyTo: -1
        };
        this.props.sendComment(payload, () => {
            this.props.requestAllComments(this.props.articleID);
            this.clearContent();
        });

    }

    render() {
        const items = this.props.comments.map(item => {
            return <CommentItem comment={item} key={item.id} currentUser={this.props.user} deleteComment={commentID=>this.deleteComment(commentID)} />;
        });
        const commenteditor = <div>
            <MarkdownEditor content={this.state.content} onContentChange={content => this.onContentChange(content)} />
            <Button type="primary" onClick={() => this.sendComment()} loading={this.props.sendStatus == CommentState.SendStatus.Sending}>Send</Button>
        </div>;
        return (
            <div>
                <br />
                <hr />
                <p>
                    <span style={{ fontSize: "large" }}><Icon type="inbox" /> Comments: </span>
                    <span style={{ float: "right" }}>
                        {this.props.contentStatus != CommentState.ContentStatus.Requesting
                            ? <a onClick={() => this.props.requestAllComments(this.props.articleID)}>Refresh</a>
                            : <a disabled>Refreshing...</a>
                        }
                    </span>
                </p>
                {items}
                <br /><hr />
                {this.props.user
                    ? commenteditor
                    : <div>Wanna comment on this article? <a onClick={e => this.props.openLoginModal()}>Click to login! </a></div>}
            </div>
        );
    }
}

export default connect(
    (s: ApplicationState) => ({ ...s.currentComments, ...s.user }),
    { ...UserState.actionCreators, ...CommentState.actionCreators },
    (stateProps, dispatchProps, ownProps: any) => ({ ...stateProps, ...dispatchProps, articleID: ownProps.articleID }))(CommentPanel);