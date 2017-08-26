import * as React from 'react';
import { APIs, errorMessage} from '../Utils';
import { Spin, Alert } from 'antd';
import { actionCreators } from '../store/AboutPage';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { MarkdownDisplay } from '../components/common';

type AboutThisProjectProps = typeof actionCreators & {loading: boolean, error:boolean, content: string, loaded: boolean};

class AboutThisProject extends React.Component<AboutThisProjectProps,any>{
    componentDidMount(){
        if (this.props.loaded){
            return;
        }
        this.props.fetchAboutProject();
    }
    constructor(props){
        super(props);
    }

    render() {
        document.title = "About this project - VicBlog";
        return this.props.loading
            ? <div><Spin spinning size="large"> Loading</Spin></div>
            : ( this.props.error 
            ? <Alert type="error" message={errorMessage.Network}/>
            : <MarkdownDisplay content={this.props.content}/>);
    }
}

export default connect(
    s=>({...s.aboutPage.aboutProject}),
    actionCreators
)(AboutThisProject);