import * as React from "react";
import { RouteComponentProps } from "react-router";


interface AsyncComponentProps {
  render: (props: RouteComponentProps<any>) => Promise<JSX.Element>,
  props: RouteComponentProps<any>
}

interface AsyncComponentState {
  component: JSX.Element;
}

export class AsyncComponent extends React.Component<AsyncComponentProps, AsyncComponentState> {
  constructor(props){
    super(props);
    this.state = {
      component: null
    }
  }

  async componentDidMount() {
    const component = await this.props.render(this.props.props);
    this.setState({
      component: component
    });
  }

  render() {
    return this.state.component;
  }
}