import { STORE_LOCALE } from "../../../constants/stores";
import { inject, observer } from "mobx-react";
import * as React from "react";
import * as moment from 'moment';
import { MomentInput } from 'moment';
import { LocaleStore } from "../../../stores";

interface LocaleDateProps {
  [STORE_LOCALE]?: LocaleStore,
  formatId: string,
  input: MomentInput,
  isUtc?: boolean
}

@inject(STORE_LOCALE)
@observer
export class LocaleDate extends React.Component<LocaleDateProps, any> {
  render() {
    const locale = this.props[STORE_LOCALE];
    const format = locale.get(this.props.formatId) as string;

    const needConvert = this.props.isUtc === undefined || this.props.isUtc;

    const momentObj = needConvert ? moment.utc(this.props.input).local() : moment(this.props.input);
    return momentObj.format(format);

  }
}