import * as React from "react";
import { AlertPanel } from "../AlertPanel";
import { LoginError, LoginErrorType, LoginNetworkError, LoginServerError } from "./LoginStore";
import { LocaleMessage } from "../../../internationalization/components";

interface LoginAlertPanelProps {
  error: LoginError,
  clearError: () => void
}


export class LoginAlertPanel extends React.Component<LoginAlertPanelProps, any> {
  render() {
    const {error} = this.props;
    if (!error) {
      return null;
    }

    const alertMessage = [] as Array<string | JSX.Element>;
    switch (error.type) {
      case LoginErrorType.WrongCredential:
        alertMessage.push(
          <LocaleMessage key={"wrongCredential"} id={"loginModal.wrongCredential"}/>
        );
        break;
      case LoginErrorType.NetworkError: {
        const trueError = error as LoginNetworkError;
        console.log(trueError);
        alertMessage.push(
          <LocaleMessage key={"networkError"} id={"loginModal.networkError"}/>
        );
        break;
      }

      case LoginErrorType.ServerError: {
        const trueError = error as LoginServerError;
        alertMessage.push(
          <LocaleMessage key={"serverError"} id={"loginModal.serverError"}/>
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
    }

    return <AlertPanel onCloseButtonClicked={this.props.clearError}>
      <h3>
        <LocaleMessage id={"loginModal.loginFailed"}/>
      </h3>
      <p>{alertMessage}</p>
    </AlertPanel>;
  }
}
