import * as React from 'react';
import { Icon, Tooltip, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { APIs } from '../Utils';
import { Link } from 'react-router';
import { VersionInfo, VersionState, actionCreators } from '../store/Version';

export type FooterProps = VersionState & typeof actionCreators;

class Footer extends React.Component<FooterProps, void>  {

    constructor() {
        super();
    }



    componentDidMount() {
        this.props.fetchVersionInfo();
    }

    render() {
        return <footer style={{ textAlign: "center" }}>
            <p>Code Proudly by <Link to="/about/me">VicCrubs</Link></p>
            <p><Icon type="github" /> FrontEnd <a href="https://github.com/viccrubs/VicBlog-Frontend">Github Repository</a>. Live Version:&nbsp;
            <Tooltip placement="right" title={this.props.frontend.updateTime}><strong>{this.props.frontend.version}</strong></Tooltip></p>
            <p><Icon type="github" /> BackEnd <a href="https://github.com/viccrubs/VicBlog-Backend">Github Repository</a>. Live Version:&nbsp;
            {this.props.fetching
                    ? "Fetching..."
                    : (
                        this.props.error
                            ? "Error"
                            : <Tooltip placement="right" title={this.props.backend.updateTime}><strong>{this.props.backend.version}</strong></Tooltip>
                    )
                }
            </p>
            <p>If you are experiencing any malfunctions, please click <a onClick={() => {
                this.props.resetApp();
                message.success("App reset. Refreshing...");
                setTimeout(()=>location.reload(), 1000);
            }}>this</a> to clean the cache and refresh the page. </p>

        </footer>
    }

}

export default connect(
    s => s.version,
    actionCreators
)(Footer);