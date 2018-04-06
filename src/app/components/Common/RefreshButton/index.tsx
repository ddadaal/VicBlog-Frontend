import React from 'react';
import * as localStyle from './style.css';
import { Spin } from "../Spin";
import { Tooltip } from "../Tooltip";
import { LocaleMessage } from "../../../internationalization/components";
import FaRefresh from 'react-icons/lib/fa/refresh';
import style from '../../style';

interface Props {
  refresh() : void;
  refreshing: boolean;
  floatRight?: boolean;
}

export class RefreshButton extends React.Component<Props, {}> {
  render() {
    return <span >
      <small className={style({[localStyle.floatRight]: this.props.floatRight}, localStyle.refreshButton)}>
        {this.props.refreshing
          ? <Spin/>
          : <Tooltip afterTooltip={<span onClick={this.props.refresh}><FaRefresh/></span>}>
            <LocaleMessage id={"contentPanel.refresh"}/>
          </Tooltip>
        }
      </small>
      </span>
  }
}
