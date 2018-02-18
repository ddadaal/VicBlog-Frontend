import style from "../style/index";
import * as React from "react";

interface AlertPanelProps {
  clearError: () => void
}

export class AlertPanel extends React.Component<AlertPanelProps, any> {
  render() {
    return <div className={style("w3-container")}>
      <div className={style("w3-panel", "w3-red", "w3-display-container")}>
      <span onClick={this.props.clearError}
            className={style("w3-button", "w3-red", "w3-large", "w3-display-topright")}>&times;</span>
        {this.props.children}
      </div>
    </div>
  };

}