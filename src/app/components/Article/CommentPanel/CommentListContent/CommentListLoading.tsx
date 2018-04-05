import React from 'react';
import style from "../../../style";
import { Spin } from "../../../Common/Spin";

interface Props {

}

export class CommentListLoading extends React.Component<Props, {}> {
  render() {
    return <div className={style("w3-container")}>
      <h3>
        <Spin/>
      </h3>
    </div>;
  }
}
