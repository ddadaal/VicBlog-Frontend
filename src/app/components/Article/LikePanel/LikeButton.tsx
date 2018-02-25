import * as React from "react";
import style from '../../style';


// import Clap from 'svg-react-loader?name=LogoPicture!../../../../assets/clap-hands.svg';

interface LikeButtonProps {
  disabled: boolean
}

export class LikeButton extends React.Component<LikeButtonProps, any> {
  render() {
    return <button disabled={this.props.disabled}
                   className={style("w3-button", "w3-circle", "w3-blue","w3-card-4")}>

    </button>
  }
}