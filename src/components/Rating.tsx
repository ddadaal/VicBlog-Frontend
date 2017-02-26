import * as React from 'react';
import { Rate, notification, Popconfirm } from 'antd';
import { actionCreators, RatingError, RatingState } from '../store/Rating';
import { UserState, Status as UserStatus, actionCreators as userActions } from '../store/User';
import { Article } from '../store/ArticlePage';
import { connect } from 'react-redux';
import { errorMessage } from '../Utils';
import { actionCreators as listActions } from '../store/ArticleList';

type RatingProps = typeof userActions & typeof actionCreators & { rateState: RatingState, userState: UserState, article: Article, expireList: () => any, disabled: boolean };

interface RatingStates {
    score: number,
    popconfirmVisible: boolean,

}

class Rating extends React.Component<RatingProps, RatingStates>{
    constructor() {
        super();
        this.state = {
            score: 0,
            popconfirmVisible: false
        };
    }

    componentDidMount() {
        this.setState({
            score: this.props.article.rate
        });
    }

    sendRate() {

        if (this.props.userState.status != UserStatus.LoggedIn) {
            notification.error({
                message: "Login required",
                description: <div>Log in to rate!<br /><a onClick={() => this.props.openLoginModal()}>Click this to login!</a></div>,
                key: "Login required",
                duration: 4
            });
            this.setState({
                score: this.props.article.rate
            });
            return;
        }
        const failedRateNotification = (description: string) => {
            notification.destroy();
            notification.error({
                message: "Rate failed",
                description: description,
                key: `rate failed because ${description}`,
                duration: 3
            });
            this.setState({
                score: this.props.article.rate
            });
        };
        this.props.rate(this.props.article.id, this.state.score, this.props.userState.user.token, (newScore) => {
            notification.destroy();
            notification.success({
                message: "Rate success!",
                description: `You rated ${this.state.score} to this article! `,
                key: "rate success",
                duration: 3
            });
            this.props.expireList();
        }, info => {
            switch (info) {
                case RatingError.ArticleNotFound:
                    failedRateNotification("This article no longer exists!");
                    break;
                case RatingError.ScoreNotInRange:
                    failedRateNotification("The score should be within 0 to 5");
                    break;
                case RatingError.Network:
                    failedRateNotification(errorMessage.Network);
                    break;
                case RatingError.Others:
                    failedRateNotification(errorMessage.Others);
                    break;
                case RatingError.Unauthorized:
                    failedRateNotification("You may need to log out and relogin!");
                    break;
            }
        });
        notification.info({
            message: "Sending your rate to the server...",
            description: "It won't take long...",
            duration: null,
            key: "sending"
        });
    }


    render() {
        const disabledProps = this.props.disabled ? {disabled: true} : {};

        return <Popconfirm visible={this.state.popconfirmVisible} title={`You want to rate ${this.state.score} in this article, don't you?`} okText="Yes" cancelText="No"
            onConfirm={() => {
                this.sendRate();
                this.setState({ popconfirmVisible: false })
            }} onCancel={() => this.setState({ score: this.props.article.rate, popconfirmVisible: false })}>
            <Rate value={this.state.score} allowHalf {...disabledProps} onChange={value => {
                this.setState({ score: value, popconfirmVisible: true });
            }} /> {this.state.score.toFixed(1)}</Popconfirm>
    }
}

export default connect(
    (s) => ({ rateState: s.rate, userState: s.user }),
    { ...actionCreators, ...userActions, expireList: listActions.expireList },
    (state, dispatch, ownProps: any) => ({ ...state, ...dispatch, article: ownProps.article, disabled: ownProps.disabled })
)(Rating);


