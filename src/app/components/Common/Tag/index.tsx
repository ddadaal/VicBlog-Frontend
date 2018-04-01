import style from "../../style";
import React from "react";
import { CSSProperties } from "react";

export function Tag(props: { text: string, colorStyle?: string, style?: CSSProperties }) {
  return <>
    <span className={style("w3-tag", props.colorStyle || "w3-blue")} style={props.style}>
      {props.text}
      </span>
    &nbsp;
  </>;
}
