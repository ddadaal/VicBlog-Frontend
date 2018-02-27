import * as React from "react";
import style from "../../style";
import FaSpin from 'react-icons/lib/fa/spinner';

export class Spin extends React.Component<any, any> {
  render() {
    return <FaSpin style={{marginLeft: "5px"}} className={style("w3-spin")}/>;
  }
}