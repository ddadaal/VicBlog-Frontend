import { appendQueryString, HttpMethod, NetworkErrorCode, urlJoin } from "./utils";
import { Injectable } from "react.di";


export class NetworkResponse<T = any> {
  statusCode: number;
  response: T;
  ok: boolean;
  error: {
    info: any,
    isNetworkError: boolean,
    isServerError: boolean
  };

  constructor(statusCode: number, response: T, error?: any) {
    this.statusCode = statusCode;
    this.response = response;
    this.ok = 200 <= statusCode && statusCode < 300;
    this.error = {
      info: error,
      isNetworkError: statusCode === NetworkErrorCode,
      isServerError: statusCode >= 500
    };
    console.log(this);
  }
}


export interface FetchInfo {
  path?: string;
  method?: HttpMethod;
  queryParams?: any;
  body?: any;
  token?: string;
}

declare var APIROOTURL: string;

@Injectable
export class HttpService {

  async sendFile<T = any>(files: FormData,
                          url: string,
                          queryParams?: any,
                          headers?: {[s: string]: string}): Promise<NetworkResponse<T>> {
    const actualUrl = urlJoin(APIROOTURL, url);
    try {
      const res = await fetch(appendQueryString(actualUrl, queryParams), {
        method: HttpMethod.POST,
        headers: headers,
        body: files
      });
      const json = await res.json();
      return new NetworkResponse(res.status, json);
    } catch (e) {
      return new NetworkResponse(NetworkErrorCode, null, e);
    }
  }

  async fetch<T = any>(fetchInfo: FetchInfo = {}): Promise<NetworkResponse<T>> {


    const authHeader = fetchInfo.token
      ? {"Authorization": `Bearer ${fetchInfo.token}`}
      : {};
    const body = fetchInfo.body
      ? {body: JSON.stringify(fetchInfo.body)}
      : {};

    const url = urlJoin(APIROOTURL, fetchInfo.path);

    try {
      const res = await fetch(appendQueryString(url, fetchInfo.queryParams), {
        method: fetchInfo.method || HttpMethod.GET,
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        },
        ...body
      });
      const json = await res.json();
      return new NetworkResponse(res.status, json);
    } catch (e) {
      return new NetworkResponse(NetworkErrorCode, null, e);
    }

  }
}
