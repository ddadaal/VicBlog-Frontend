import * as React from 'react';
import { actionCreators, VersionState } from '../../store/Version';
import { connect } from 'react-redux';
import { Alert, Button, message } from 'antd';
import Cookies from 'js.cookie';

type CacheCleanTipProps = VersionState & typeof actionCreators;
interface CacheCleanTipState {
    done: boolean
}

class CacheCleanTip extends React.Component<CacheCleanTipProps, CacheCleanTipState>{

    componentDidMount() {
        this.setState({
            done: Cookies.get("cacheCleaned") === "0"
        });
    }

    constructor() {
        super();
        this.state = {
            done: false
        };
    }
    render() {
        if (!this.state.done) {
            const button = <Button type="primary" onClick={() => {
                    this.props.resetApp();
                    this.setState({ done: true });
                    message.success("Cache cleaned. Thanks for your support.");
                    Cookies.set("cacheCleaned", "0");
                }}>button</Button>;
            return <div>
                <Alert type="warning" message={<div>Breaking changes occured in this build. Please click this {button} to clean the local cache. If you have done this, just ignore this. Thanks.</div>} />
                
            </div>;
        }
        return <div/>;
    }
}

export default connect(
    s => s.version,
    actionCreators
)(CacheCleanTip);