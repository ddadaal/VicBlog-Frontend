import React, { CSSProperties, ReactNode } from "react";
import style from "../../style";
import * as localStyle from './style.css';

interface TooltipProps {
  beforeTooltip?: ReactNode;
  afterTooltip?: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

export class Tooltip extends React.Component<TooltipProps, any> {
  render() {
    return <span onClick={this.props.onClick} className={style("w3-tooltip", this.props.className)} style={this.props.style}>
      {this.props.beforeTooltip}
      <span className={style("w3-text","w3-tag","w3-animate-opacity", localStyle.tooltip)}>
        {this.props.children}
      </span>
      {this.props.afterTooltip}
  </span>;
  }
}
