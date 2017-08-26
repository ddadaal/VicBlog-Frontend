import * as React from 'react';
import moment from 'moment';
import { Icon, DatePicker, Checkbox, Tooltip } from 'antd';


export interface DateSelectorProps {
    enabled: boolean,
    onEnabledChange: () => any,
    onChange: (date: [moment.Moment, moment.Moment], dateString: [string, string]) => any,
    iconName: string,
    message: string
}

export default class DateSelector extends React.Component<DateSelectorProps, any>{
    render() {


        return <div>
            <div style={{display: "inline"}}>
                <Icon type={this.props.iconName} /> {this.props.message} &nbsp;
                <span style={{ marginLeft: "auto" }}><Tooltip placement="top" title="This actual time presented is 00:00:00 of that day." ><Checkbox checked={this.props.enabled} onChange={e => this.props.onEnabledChange()}>Enable</Checkbox></Tooltip></span>
            </div>
            <DatePicker.RangePicker disabled={!this.props.enabled} onChange={(date, dateString) => this.props.onChange(date, dateString)} />
        </div>
    }
}