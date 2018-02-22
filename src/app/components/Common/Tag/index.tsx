import style from "../../style";
import * as React from "react";
import { CSSProperties } from "react";

export function Tag(props: { text: string, colorStyle?: string, style?: CSSProperties }) {
  return <span><span className={style("w3-tag", props.colorStyle || "w3-blue")} style={props.style}>{props.text}</span> </span>;
}