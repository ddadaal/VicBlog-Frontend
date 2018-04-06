import React from 'react';
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { LocaleStore } from "../../stores";
import { ui } from "../../stores/UiUtil";

interface Props {
  formatId: string;
  replacements?: {[key: string]: string};
}

interface DocumentTitleProps {
  title: string;
}

export class DocumentTitle extends React.Component<DocumentTitleProps, {}> {
  setTitle() {
    ui.documentTitle = this.props.title;
  }

  componentDidMount() {
    this.setTitle();
  }

  componentDidUpdate() {
    this.setTitle();
  }

  render() {
    return this.props.children;
  }
}


@observer
export class LocalizedDocumentTitle extends React.Component<Props, {}> {


  @Inject localeStore: LocaleStore;

  render() {
    try {
      const formattedTitle = this.localeStore.get(this.props.formatId, this.props.replacements) as string;
      return <DocumentTitle title={formattedTitle}>
        {this.props.children}
      </DocumentTitle>
    } catch (e) {
      return <DocumentTitle title={this.props.formatId}>
        {this.props.children}
      </DocumentTitle>;
    }


  }
}
