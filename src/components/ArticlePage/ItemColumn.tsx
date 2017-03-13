import * as React from 'react';
import { Tooltip, Icon } from 'antd';

const ItemColumn: React.StatelessComponent<{ iconName: string, content: string | JSX.Element | JSX.Element[], tooltip: string }> =
    (props) =>
        <Tooltip title={props.tooltip}><span><Icon type={props.iconName} /> {props.content} &nbsp;</span></Tooltip>;

export default ItemColumn;