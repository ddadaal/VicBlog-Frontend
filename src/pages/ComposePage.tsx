import * as React from 'react';
import { MarkdownEditor } from '../components/MarkdownEditor';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { UserState, actionCreators as userActions } from '../store/User';
import { ArticleFilterState } from '../store/ArticleListFilter';
import { Link } from 'react-router';
import { Input, Button, Row, Col, Checkbox, notification } from 'antd';
import { padding,twoColStyleLeft, twoColStyleRight } from '../Utils';
import { actionCreators as composeActions, ComposeArticleState, ArticleSubmitStatus } from '../store/ComposeArticle';
import ArticleEditorSidePanel from '../components/ArticleEditorSidePanel';

type ComposePageProps = {user: UserState, compose: ComposeArticleState}  & typeof userActions & typeof composeActions;

interface ComposePageStates {
    title: string
    content: string,
}

class ComposePage extends React.Component<ComposePageProps, ComposePageStates>{
    constructor() {
        super();
        this.state = {
            title: "",
            content: "",
        }
    }

    handleContentChange(content) {
        this.setState({
            content: content
        });
    }

    submitArticle(){
        notification.info({
            message: "Submitting",
            description: "The article is being submitted. This won't take long.",
            duration: null
        });
        this.props.submitArticle({
            title: this.state.title,
            content: this.state.content,
            tags: this.props.compose.selectedTags,
            category: this.props.compose.selectedCategory,
            token: this.props.user.user.token,
            initialRate: this.props.compose.rate
        },(article)=>{
            notification.destroy();
            notification.success({
                message: "Article submitted!",
                description: <div>The article has been submitted successfully. Click <Link to={"/articles/"+article.id}>this</Link> to see it!</div>
            });
        },(errorInfo)=>{
            notification.destroy();
            notification.error({
                message: "Submit failed :(",
                description: `Something goes wrong :(`
            });
        });
    }

    render() {
        return <Row>
            <Col style={padding} {...twoColStyleLeft}>
                <ArticleEditorSidePanel/>
            </Col>
            <Col style={padding} {...twoColStyleRight}>
            You are currently logged in as {this.props.user.user.username}. Isn't it? <a onClick={this.props.logout}>Log out</a> and <a onClick={this.props.openLoginModal}>relogin</a>
            <Input placeholder="Title" value={this.state.title} onChange={e=>this.setState({title: (e.target as any).value})} />
            <MarkdownEditor minRow={8} placeholder="Input your content here" content={this.state.content} onContentChange={content => this.handleContentChange(content)} />
            <Button type="primary" loading={this.props.compose.status == ArticleSubmitStatus.Submitting} onClick={()=>this.submitArticle()} children="Submit" />
            </Col>
        </Row>;
    }
}

export default connect(
    (s: ApplicationState) => ({user: {...s.user}, compose: {...s.composeArticle}}),
    {...userActions, ...composeActions}
)(ComposePage);