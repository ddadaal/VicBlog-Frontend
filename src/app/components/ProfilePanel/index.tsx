import * as React from "react";
import { SelfIntroPanel } from "./SelfIntroPanel";
import { ContactPanel } from "./ContactPanel";

export class ProfilePanel extends React.Component<any, any> {
  render() {
    return <div>
        <SelfIntroPanel/>
        <ContactPanel/>
    </div>
  }
}
