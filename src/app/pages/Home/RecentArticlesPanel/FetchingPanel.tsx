import React from 'react';
import { LocaleMessage } from "../../../internationalization/components";
import { Spin } from "../../../components/Common/Spin";

interface Props {

}

export class FetchingPanel extends React.Component<Props, {}> {
  render() {
    return <div>
      <p><Spin/><LocaleMessage id={"homepage.recentArticles.fetching"}/></p>
    </div>
  }
}
