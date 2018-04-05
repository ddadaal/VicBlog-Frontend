import style from "../../style";
import React, { CSSProperties } from "react";

interface TagProps {
  text: string;
  colorStyle?: string;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

export function Tag(props: TagProps) {
  return <span onClick={props.onClick} className={style("w3-tag", props.colorStyle, props.className)} style={props.style}>
      {props.text}
      </span>;
}
