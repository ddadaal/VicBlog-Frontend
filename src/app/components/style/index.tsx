import * as style from 'w3-css/w3.css';

import * as classNames from 'classnames';

interface ClassDictionary {
  [id: string]: boolean | undefined | null;
}

// Copied from classnames definitions
interface ClassArray extends Array<ClassValue> { }

type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | false;

function processStringValue(x: string) {
  return style[x] || x;
}

function processValue(x: ClassValue) {
  if (typeof x === 'string') {
    return processStringValue(x);
  }
  if (Array.isArray(x)) {
    return (x as ClassArray).map(processStringValue);
  }
  if (typeof x === 'object' && x !== null) {
    return Object.keys(x)
      .reduce((prev, val) => ({...prev, [processStringValue(val)]: x[val]}), {});
  }
  return x;
}

export default function (...args: ClassValue[]): string {
  return classNames(...(args.map(processValue)));
}