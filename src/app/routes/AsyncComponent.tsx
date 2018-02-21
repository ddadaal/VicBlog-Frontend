import * as React from "react";
import { observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";
import { ReactNode } from "react";


interface AsyncComponentProps<T> {
  render: (props: T) => Promise<ReactNode>,
  props?: T,
  componentWhenLoading?: ReactNode
}

@observer
export class AsyncComponent<T> extends React.Component<AsyncComponentProps<T>, any> {
  @observable component: ReactNode = this.props.componentWhenLoading || null;

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