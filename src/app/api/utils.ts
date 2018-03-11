import * as queryString from "querystring";

export function urlJoin(...params: string[]) {
  const re1 = new RegExp('^\\/|\\/$','g');
  const elts = Array.prototype.slice.call(params.filter(x => !!x));
  return elts.map(element => element.replace(re1,"")).join('/');
}

export const NetworkErrorCode = -1;

function removeFalsyValues(params: any) {
  return Object.keys(params)
    .filter(x => !!params[x])
    .reduce((prev, curr) => ({...prev, [curr]: params[curr]}), {});
}

export function appendQueryString(url: string, params: any, ignoreFalsyValues: boolean = false) {
  return url + "?" + queryString.stringify(ignoreFalsyValues ? removeFalsyValues(params) : params);
}

export function parseQueryString(query: string) {
  if (query.startsWith("?")) {
    query = query.substr(1, query.length-1);
  }
  return queryString.parse(query);
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH"
}


