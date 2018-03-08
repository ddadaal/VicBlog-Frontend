import { appendQueryString, HttpMethod, NetworkErrorCode, urlJoin } from "./utils";


export class NetworkResponse<T> {
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
    this.ok = 200 <= statusCode && statusCode <300;
    this.error = {
      info: error,
      isNetworkError: statusCode === NetworkErrorCode,
      isServerError: statusCode >= 500
    };
    console.log(this);
  }
}


interface FetchInfo {
  route?: string,
  method?: HttpMethod,
  queryParams?: any,
  payload?: any,
  token?: string
}

declare var APIROOTURL: string;


export abstract class BaseService {

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = urlJoin(APIROOTURL, endpoint);
  }

  protected async fetch<T = any>(fetchInfo: FetchInfo): Promise<NetworkResponse<T>> {
    const authHeader = fetchInfo.token
      ? {"Authorization": `Bearer ${fetchInfo.token}`} : {};

    const url = urlJoin(this.endpoint, fetchInfo.route);

    try {
      const res = await fetch(appendQueryString(url,fetchInfo.queryParams), {
        method: fetchInfo.method || HttpMethod.GET,
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        },
        body: fetchInfo.payload
      });
      const json = await res.json();
      return new NetworkResponse(res.status, json);
    } catch (e) {
      return new NetworkResponse(NetworkErrorCode, null, e);
    }

  }
}
