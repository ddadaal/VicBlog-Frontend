import * as React from "react";
import { LocaleMessage } from "../../internationalization/components";

export class SelfIntroPanel extends React.Component<{}> {
  render() {
    return <div>
      <h3><b><LocaleMessage id={"profile.selfIntro.title"}/></b></h3>
      <p><LocaleMessage id={"profile.selfIntro.description"}/></p>
    </div>;
  }
}
