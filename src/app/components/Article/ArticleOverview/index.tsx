import * as React from "react";
import * as classNames from 'classnames';
import * as localStyle from './style.css';
import { action, observable } from "mobx";
import { ui } from "../../../stores/UiStore";
import { observer } from "mobx-react";
import { ArticleLinks } from "./ArticleLinks";

interface ArticleOverviewProps {
  content: string,
}


@observer
export class ArticleOverview extends React.Component<ArticleOverviewProps, any> {
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
    return <div ref={this.ref} className={classNames({[localStyle["overview-sticky"]]: this.sticky})}>
      <ArticleLinks content={this.props.content}/>
    </div>;
  }
}