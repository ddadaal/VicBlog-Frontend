import * as style from 'w3-css/w3.css';

import * as classNames from 'classnames';

// const process = (...args: string[]) => {
//   return classNames(...(args.map(x => style[x])));
// };

export default function (...args: string[]) {
  return classNames(...(args.map(x => style[x])));
}