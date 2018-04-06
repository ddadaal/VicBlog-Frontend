import { default as React, ReactNode } from "react";
import style from "../../style";

export function PageLink(props: { active: boolean, pageNumber: number, onClick: () => void, content?: ReactNode, disabled?: boolean }) {
  return <button disabled={props.disabled == undefined ? false : props.disabled}
                 onClick={props.onClick}
                 className={style("w3-button", {"w3-blue": props.active})}>
    {props.content == undefined ? props.pageNumber : props.content}
  </button>;
}
