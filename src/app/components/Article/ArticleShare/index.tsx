import React from 'react';
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FaShareSquareO from 'react-icons/lib/fa/share-square-o';
import { LocaleMessage } from "../../../internationalization/components";
import * as localStyle from './style.css';

interface Props {
  link: string;
}

@observer
export class ArticleShare extends React.Component<Props, {}> {

  @observable copied: boolean = false;

  @action onCopy = () => {
    this.copied = true;
  };


  render() {
    return <div className={localStyle.parent}>
      <CopyToClipboard text={this.props.link}
                       onCopy={this.onCopy}>
        <p>
          <FaShareSquareO/>
          <LocaleMessage id={"article.share.clickToCopy"}/>
        </p>
      </CopyToClipboard>
      <p>
        {this.copied
          ? <LocaleMessage id={"article.share.copied"}/>
          : null
        }
      </p>
    </div>
  }
}
