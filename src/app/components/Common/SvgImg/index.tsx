import * as React from "react";
import ReactSVG from 'react-svg';

interface SvgImgProps {
  filePath: string,
  size: number
}

export class SvgImg extends React.Component<SvgImgProps, {}> {
  render() {
    const size = `${this.props.size}px`;
    return <ReactSVG
      path={`../../../../assets/img/${this.props.filePath}`}
      style={{ width: size, height: size}}
    />;
  }

}