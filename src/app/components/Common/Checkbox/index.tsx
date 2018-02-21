import * as React from "react";
import style from '../../style/index';

interface CheckboxProps {
  checked: boolean,
  onClicked: () => void
}

export class Checkbox extends React.Component<CheckboxProps, any> {

  onChange = (e) => {
    this.props.onClicked();
  };

  render() {
    return <input className={style("w3-check")} type="checkbox" checked={this.props.checked} onChange={this.onChange} />
  }
}