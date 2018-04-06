import React from "react";
import style from "../../style";
import FaSpin from 'react-icons/lib/fa/spinner';


interface Props {
  className?: string;
}

export class Spin extends React.Component<Props, any> {
  render() {
    return <FaSpin style={{marginLeft: "5px"}} className={style("w3-spin", this.props.className)}/>;
  }
}
