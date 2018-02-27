import * as React from "react";
import { ReactNode } from "react";
import { observer } from "mobx-react";
import { action, observable, runInAction } from "mobx";


interface AsyncComponentProps<T> {
  render: (props: T) => Promise<ReactNode>;
  props?: T;
  componentWhenLoading?: ReactNode;
  componentProducerWhenLoadingFailed?: (e) => ReactNode;
}

@observer
export class AsyncComponent<T> extends React.Component<AsyncComponentProps<T>, any> {
  @observable component: ReactNode = this.props.componentWhenLoading || null;

  @action async componentDidMount() {
    try {
      const component = await this.props.render(this.props.props);
      runInAction("async component loaded", () => {
        this.component = component;
      });
    } catch(e) {
      runInAction("async component failed", () => {
        if (this.props.componentProducerWhenLoadingFailed) {
          this.component = this.props.componentProducerWhenLoadingFailed(e);
        }
      });
    }

  }

  render() {
    return this.component;
  }
}