import React from "react";

interface SvgImgProps {
  filePath: string,
  size: number
}

export class SvgImg extends React.Component<SvgImgProps, {}> {

  render() {
    const Svg = require(`svg-react-loader?name=Svg!../../../../assets/img/${this.props.filePath}`);
    return <Svg width={this.props.size} height={this.props.size}/>;
  }

}
