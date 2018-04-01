import React from "react";
import { ReactNode } from 'react';
import style from '../../style';

interface DropdownProps {
  entry: ReactNode,
}

export class Dropdown extends React.Component<DropdownProps, any> {
  render() {
    return <div className={style("w3-dropdown-hover")}>
        {this.props.entry}
        <div className={style("w3-dropdown-content","w3-bar-block","w3-card-4")}>
          {this.props.children}
          {/*<a href="#" class="w3-bar-item w3-button">Link 1</a>*/}
          {/*<a href="#" class="w3-bar-item w3-button">Link 2</a>*/}
          {/*<a href="#" class="w3-bar-item w3-button">Link 3</a>*/}
        </div>
      </div>;
  }
}
