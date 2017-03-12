import * as React from 'react';
import { Icon, Tooltip } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { APIs } from '../Utils';
import { Link } from 'react-router';
import { BackendVersionInfo, VersionState, actionCreators } from '../store/Version';

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
            <p><Icon type="github" /> FrontEnd <a href="https://github.com/viccrubs/VicBlog-Frontend">Github Repository</a>. Live Version: <strong>{this.props.frontend}</strong></p>
            <p><Icon type="github" /> BackEnd <a href="https://github.com/viccrubs/VicBlog-Backend">Github Repository</a>. Live Version:&nbsp;
            {this.props.fetching
                    ? "Fetching..."
                    : (
                        this.props.error
                        ? "Error"
                        : <Tooltip placement="bottom" title={this.props.backend.updateTime}><strong>{this.props.backend.version}</strong></Tooltip>
                    )
                }
            </p>
        </footer>
    }

}

export default connect(
    s=>s.version,
    actionCreators
)(Footer);