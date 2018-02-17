import { LoginError, LoginErrorType, LoginServerError } from "../../../stores/UserStore";
import style from "../../style";
import * as React from "react";
import { LocaleMessage } from "../../../internationalization";

interface AlertPanelProps {
  error: LoginError,
  clearError: () => void
}

export class AlertPanel extends React.Component<AlertPanelProps, any> {

  generateAlertPanel = () => {
    const alertMessage = [] as Array<string | JSX.Element>;
    const {error} = this.props;

    switch (error.type) {
      case LoginErrorType.WrongCredential:
        alertMessage.push(
          <LocaleMessage id={"loginModal.wrongCredential"}/>
        );
        break;
      case LoginErrorType.NetworkError:
        alertMessage.push(
          <LocaleMessage id={"loginModal.networkError"}/>
        );
        break;
      case LoginErrorType.ServerError:
        const trueError = error as LoginServerError;
        alertMessage.push(
          <LocaleMessage id={"loginModal.serverError"}/>
        );
        alertMessage.push(
          <br key={0}/>
        );
        for (const message of trueError.messages) {
          alertMessage.push(<br key={message}/>);
          alertMessage.push(message);
        }
        break;
    }

    return <div className={style("w3-container")}>
      <div className={style("w3-panel", "w3-red", "w3-display-container")}>
      <span onClick={this.props.clearError}
            className={style("w3-button", "w3-red", "w3-large", "w3-display-topright")}>&times;</span>
        <h3>
          <LocaleMessage id={"loginModal.loginFailed"}/>
        </h3>
        <p>{alertMessage}</p>
      </div>
    </div>
  };

  render() {
    return this.props.error ? this.generateAlertPanel() : null;
  }
}