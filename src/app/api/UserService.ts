import { HttpService } from "./HttpService";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";

export interface LoginResult {
  token: string,
  username: string,
  role: string
}

function encryptPassword(password: string) {
  return password;
}
@Injectable
export class UserService {

  constructor(@Inject private http: HttpService) {

  }

  async login(username: string, password: string) {
    password = encryptPassword(password);

    return await this.http.fetch({
      path: "/Account/Login",
      queryParams: {username, password}
    });
  }

  async register(username: string, password: string) {
    password = encryptPassword(password);

    return await this.http.fetch({
      path: "/Account/Register",
      body: {username, password},
      method: HttpMethod.POST
    });
  }

}
