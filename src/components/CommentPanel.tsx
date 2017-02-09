import * as React from 'react';
import * as CommentState from '../store/CommentPanel';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { MarkdownEditor } from './MarkdownEditor';
import { CommentItem } from './CommentItem';

type CommentPanelProps = CommentState.CommentPanelState & typeof CommentState.actionCreators & { articleID: number };

class CommentPanel extends React.Component<CommentPanelProps, void>{

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.requestAllComments(this.props.articleID);
    }

    render() {
        const items = this.props.comments.map(item => {
            return <CommentItem comment={item} key={item.id} />;
        });
        return (
            <div>
                <hr />
                <h3> Comments: </h3>
                {items}
            </div>
        );
    }
}

export default connect(
    (s: ApplicationState) => s.currentComments,
    CommentState.actionCreators, (stateProps, dispatchProps: typeof CommentState.actionCreators, ownProps: any) => ({ ...stateProps, ...dispatchProps, articleID: ownProps.articleID }))(CommentPanel);