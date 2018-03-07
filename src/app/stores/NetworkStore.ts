import * as queryString from "querystring";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export const NetworkErrorCode = -1;

export class NetworkResponse<T> {
  statusCode: number;
  response: T;
  error: any;
  get ok() {
    return 200 <= this.statusCode && this.statusCode <= 300;
  }

  get isNetworkError() {
    return this.statusCode === NetworkErrorCode;
  }

  constructor(statusCode: number, response: T, error?: any) {
    this.statusCode = statusCode;
    this.response = response;
    this.error = error;
    console.log(this);
  }
}

export class NetworkStore {

  static appendQueryString(url: string, params: any) {
    return url + "?" + queryString.stringify(params);
  }


  static async fetch<T = any>(url: string, method: HttpMethod = HttpMethod.GET, payload?: any, token?: string): Promise<NetworkResponse<T>> {
    const authHeader = token ? {"Authorization": `Bearer ${token}`} : {};
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        },
        body: payload
      });
      const json = await res.json();
      return new NetworkResponse(res.status, json);
    } catch (e) {
      return new NetworkResponse(NetworkErrorCode, null, e);
    }

  }
}
