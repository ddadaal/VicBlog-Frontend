import React, { ReactNode } from "react";
import { AlertPanel } from "../AlertPanel";
import { RegisterError, RegisterErrorType, RegisterServerError } from "./RegisterStore";
import { LocaleMessage } from "../../../internationalization/components";

interface RegisterAlertPanelProps {
  error: RegisterError,
  clearError: () => void
}


export class RegisterAlertPanel extends React.Component<RegisterAlertPanelProps, any> {
  render() {
    const {error} = this.props;
    if (!error) {
      return null;
    }

    const alertMessage = [] as Array<ReactNode>;
    switch (error.type) {
      case RegisterErrorType.Server500Error:
        alertMessage.push(<LocaleMessage id={"registerModal.server500Error"} key={"registerModal.server500Error"}/>);
        break;
      case RegisterErrorType.UsernameConflict:
        alertMessage.push(
          <LocaleMessage key={"usernameConflict"} id={"registerModal.usernameConflict"}/>
        );
        break;
      case RegisterErrorType.NetworkError:
        alertMessage.push(
          <LocaleMessage key={"networkError"} id={"registerModal.networkError"}/>
        );
        break;
      case RegisterErrorType.ServerError:
        const trueError = error as RegisterServerError;
        alertMessage.push(
          <LocaleMessage key={"serverError"} id={"registerModal.serverError"}/>
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

    return <AlertPanel onCloseButtonClicked={this.props.clearError}>
      <h3>
        <LocaleMessage id={"registerModal.registerFailed"}/>
      </h3>
      <p>{alertMessage}</p>
    </AlertPanel>;
  }
}
