import * as React from "react";
import { observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";


interface AsyncComponentProps<T> {
  render: (props: T) => Promise<JSX.Element>,
  props?: T,
  componentWhenLoading?: JSX.Element | string
}

@observer
export class AsyncComponent<T> extends React.Component<AsyncComponentProps<T>, any> {
  @observable component: JSX.Element | string = this.props.componentWhenLoading || null;

  @action async componentDidMount() {
    const component = await this.props.render(this.props.props);
    runInAction("async component loaded", () => {
      this.component = component;
    });
  }

  render() {
    return this.component;
  }
}