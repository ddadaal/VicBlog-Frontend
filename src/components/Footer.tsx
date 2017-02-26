import * as React from 'react';
import { Icon } from 'antd';
import moment from 'moment';

interface FooterProps {

}

export const Footer: React.StatelessComponent<FooterProps> = (props: FooterProps) => {
    return <footer style={{ textAlign: "center" }}>
        <p>Code by <a href="https://github.com/viccrubs">VicCrubs</a></p>
        <p><Icon type="github" /> FrontEnd Project <a href="https://github.com/viccrubs/VicBlog-Frontend">Github Repository</a></p>
        <p><Icon type="github" /> BackEnd Project <a href="https://github.com/viccrubs/VicBlog-Backend">Github Repository</a></p>
        { moment(Date.now()).year() }
    </footer>
}