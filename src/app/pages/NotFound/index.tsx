import * as React from "react";
import { PageConfig } from "../index";

export class NotFoundPage extends React.Component<any, any> {

  render() {
    return <p>notfound</p>;
  }
}

export const notFoundPageConfig: PageConfig =  {
  path: "",
  isThisPage: (pathname: string) => true,
  render: (props) => <NotFoundPage/>,
  exact: false
};