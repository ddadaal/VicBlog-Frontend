import * as React from 'react';
import { MarkdownEditor } from '../components/MarkdownEditor';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { UserState, actionCreators as userActions, Status as UserStatus } from '../store/User';
import { browserHistory } from 'react-router';
import { Article } from '../store/ArticlePage';
import { ArticleFilterState } from '../store/ArticleListFilter';
import { Link } from 'react-router';
import { Input, Button, Row, Col, Checkbox, notification, Alert } from 'antd';
import { padding, twoColStyleLeft, twoColStyleRight, simpleFormValidator } from '../Utils';
import { actionCreators as composeActions, ComposeArticleState, ArticleSubmitStatus, EditorMode } from '../store/ComposeArticle';
import ArticleEditorSidePanel from '../components/ArticleEditorSidePanel';
import UploadPanel, { UploadedFile } from './UploadPanel';
import fetch from 'isomorphic-fetch';

type ArticleEditorProps = { user: UserState, compose: ComposeArticleState, initialArticle: Article } & typeof userActions & typeof composeActions;


class ArticleEditor extends React.Component<ArticleEditorProps, void>{

    constructor() {
        super();

    }
    componentDidMount() {
        this.props.setMode(this.props.initialArticle ? EditorMode.Patch : EditorMode.New);
        this.props.initiateArticleInfo(this.props.initialArticle);
    }


    submitArticle() {
        const payload = {
            title: this.props.compose.title,
            content: this.props.compose.content,
            tags: this.props.compose.selectedTags,
            category: this.props.compose.selectedCategory,
            rate: this.props.compose.rate
        };

        const emptyKeys = simpleFormValidator(payload);

        if (emptyKeys) {
            notification.error({
                message: `${this.props.compose.mode == EditorMode.New ? "Submit" : "Patch"} failed`,
                description: `${emptyKeys.join(",")} ${emptyKeys.length > 1 ? "are" : "is"} required.`
            });
            return;
        }

        notification.info({
            message: this.props.compose.mode == EditorMode.New ? "Submitting" : "Patching",
            description: `The article is being ${this.props.compose.mode == EditorMode.New ? "submitted" : "patched"}. This won't take long.`,
            duration: null
        });
        if (this.props.compose.mode == EditorMode.New) {
            this.props.submitArticle(this.props.user.user.token, payload, (article) => {
                notification.destroy();
                notification.success({
                    message: `Article submitted!`,
                    description: <div>The article has been submitted successfully. Click <a onClick={() => browserHistory.push("/articles/" + article.id)}>this</a> to see it!</div>
                });
            }, (errorInfo) => {
                notification.destroy();
                notification.error({
                    message: `Submit failed :(`,
                    description: `Something goes wrong :(`
                });
            });
        } else {
            this.props.patchArticle(this.props.initialArticle.id, this.props.user.user.token, payload, (result) => {
                notification.destroy();
                notification.success({
                    message: "Patch successfully!",
                    description: <div>The article has been patched successfully. Click <a onClick={() => browserHistory.push("/articles/" + result.article.id)}>this</a> to see it!</div>
                })
            }, (errorInfo) => {
                notification.destroy();
                notification.error({
                    message: `Patch failed :(`,
                    description: `Something goes wrong :(`
                });
            })
        }

    }

    handleUploadedFileClick(file: UploadedFile) {

        const picturePostfixes = [".jpg", ".jpeg", ".png", ".gif"];

        const a = picturePostfixes.map(x => file.filename.endsWith(x)).join(",");

        if (a.includes("true")) {
            this.props.changeContent(this.props.compose.content + `![${file.filename}](${file.url})`);
        }else{
            this.props.changeContent(this.props.compose.content + `[${file.filename}](${file.url})`)
        }
    }

    handleRemoveFile(file:UploadedFile){
        
    }


    render() {
        return this.props.user.status == UserStatus.LoggedIn ?
            <Row>
                <Col style={padding} {...twoColStyleLeft}>
                    <ArticleEditorSidePanel />
                    <UploadPanel token={this.props.user.user.token} onClick={file=>this.handleUploadedFileClick(file)} />
                </Col>
                <Col style={padding} {...twoColStyleRight}>
                    You are currently logged in as {this.props.user.user.username}. Isn't it? <a onClick={this.props.logout}>Log out</a> or <a onClick={this.props.openLoginModal}>relogin</a><br />
                    {this.props.compose.mode == EditorMode.Patch ? `You are now patching Article with title ${this.props.initialArticle.title}.` : ""}
                    <Input placeholder="Title" value={this.props.compose.title} onChange={e => this.props.changeTitle((e.target as any).value)} />
                    <MarkdownEditor minRow={8} placeholder="Input your content here" content={this.props.compose.content} onContentChange={content => this.props.changeContent(content)} />
                    <Button type="primary" icon="upload" loading={this.props.compose.submitStatus == ArticleSubmitStatus.Submitting} onClick={() => this.submitArticle()} children="Submit" />
                </Col>
            </Row>
            : <div>
                <Alert message="You are not logged in!" type="error" />
                <a onClick={() => this.props.openLoginModal()}>Click this to login!</a>
            </div>
            ;
    }
}

export default connect(
    (s: ApplicationState) => ({ user: { ...s.user }, compose: { ...s.composeArticle } }),
    { ...userActions, ...composeActions },
    (state, dispatch, ownProps: any) => ({ ...state, ...dispatch, initialArticle: ownProps.initialArticle })
)(ArticleEditor);