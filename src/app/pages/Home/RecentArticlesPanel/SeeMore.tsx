import React from "react";
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import { LocaleMessage } from "../../../internationalization/components";
import * as localStyle from './style.css';
import { Link } from 'react-router-dom';

export function SeeMore(props: { id: string, path: string }) {
  return <Link to={props.path}>
    <span className={localStyle.link}>
    <small>
    <LocaleMessage id={props.id}/>
      &nbsp;
      <FaAngleRight/>
    </small>
  </span>
  </Link>
}
