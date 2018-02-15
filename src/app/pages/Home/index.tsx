import * as React from "react";
import { PageConfig } from "../index";

export class HomePage extends React.Component<any, any> {

  render() {
    return <p>homepage</p>;
  }
}

export const homePageConfig: PageConfig = {
  path: "/",
  render: props => <HomePage/>,
  isThisPage: (pathname: string) => {
    return pathname === '/';
  },
  exact: true
};
