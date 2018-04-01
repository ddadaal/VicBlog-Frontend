import style from "../style/index";
import React from "react";

interface AlertPanelProps {
  onCloseButtonClicked?: () => void,
  clickButtonShown?: boolean
}

export class AlertPanel extends React.Component<AlertPanelProps, any> {

  clearError = () => {
    if (this.props.onCloseButtonClicked) {
      this.props.onCloseButtonClicked();
    }
  };

  get clickButtonShown() {
    return this.props.clickButtonShown == undefined ? true : this.props.clickButtonShown;
  }

  render() {
    return <div className={style("w3-container")}>
      <div className={style("w3-panel", "w3-red", "w3-display-container")}>
        {this.clickButtonShown
          ? <span onClick={this.clearError}
                  className={style("w3-button", "w3-red", "w3-large", "w3-display-topright")}>&times;</span>
          : null
        }

        {this.props.children}
      </div>
    </div>
  };

}
