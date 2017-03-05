import * as React from 'react';
import { Icon, Tooltip } from 'antd';
import moment from 'moment';
import { APIs } from '../Utils';
import { Link } from 'react-router';

declare const FRONT_END_BUILD: string;

interface FooterStates {
    loading: boolean,
    version: string,
    updatedTime: string,
    error: boolean,
    loaded: boolean
}

export default class Footer extends React.Component<void, FooterStates>  {

    constructor() {
        super();
        this.state = {
            loading: false,
            version: "",
            updatedTime: "",
            error: false,
            loaded: false
        }
    }



    componentDidMount() {
        fetch(APIs.backendVersion).then(res => res.json()).then(value => {
            this.setState({
                loading: false,
                error: false,
                version: (value as any).version,
                updatedTime: (value as any).updateTime,
                loaded: true
            });
        }).catch(res => {
            this.setState({
                loading: false,
                error: true,
                loaded: false
            })
        })
    }

    render() {
        return <footer style={{ textAlign: "center" }}>
            <p>Code Proudly by <Link to="/about/me">VicCrubs</Link></p>
            <p><Icon type="github" /> FrontEnd <a href="https://github.com/viccrubs/VicBlog-Frontend">Github Repository</a>. Live Version: <strong>{FRONT_END_BUILD}</strong></p>
            <p><Icon type="github" /> BackEnd <a href="https://github.com/viccrubs/VicBlog-Backend">Github Repository</a>. Live Version:&nbsp;
            {this.state.loaded
                    ? <Tooltip title={this.state.updatedTime}><strong>{this.state.version}</strong></Tooltip>
                    : this.state.error ? "Error" : "Fetching..."
                }
            </p>
        </footer>
    }

}