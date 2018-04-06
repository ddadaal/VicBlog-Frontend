import React, { ReactNode } from 'react';
import * as localStyle from './style.css';


interface Props {
  title: ReactNode;
  className?: string;
}


export class ContentPanel extends React.Component<Props, {}> {

  render() {
    return <div className={this.props.className}>
      <h3 className={localStyle.header}>
        {this.props.title}
      </h3>
      <div>
        {this.props.children}
      </div>
    </div>
  }
}
