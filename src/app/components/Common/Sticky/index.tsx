import React from "react";
import { ReactNode } from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { ui } from "../../../stores/UiUtil";

interface StickyProps {
  children: (shouldSticky: boolean) => ReactNode
}

@observer
export class Sticky extends React.Component<StickyProps, any> {
  @observable sticky = false;
  dom: Element;

  get stickyApplicable() {
    return ui.isBrowser && this.dom;
  }

  @action handleScroll = () => {
    if (this.stickyApplicable) {
      this.sticky = window.pageYOffset >= this.dom.getBoundingClientRect().top;
    }
  };

  componentDidMount(){
    if (this.stickyApplicable) {
      window.addEventListener('scroll', this.handleScroll);
    }

  }

  componentWillUnmount() {
    if (this.stickyApplicable) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  ref = (dom) => {
    this.dom = dom;
  };

  render() {
    return <div ref={this.ref}>
      {this.props.children(this.sticky)}
      </div>
  }
}
