import * as React from 'react';
import { Alert } from 'antd';
import { Link } from 'react-router';
export default class NotFoundPage extends React.Component<void, void>{
    render() {
        return <div style={{maxWidth: "1200px", marginLeft:"auto",marginRight:"auto"}}> 
            <Alert
            message="You have entered nowhere! "
            description="Something wrong with your URL?"
            type="warning"
            showIcon
        />
        <Link to="/">How about going back to homepage?</Link>
        </div>
    }
}