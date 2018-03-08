import { BaseService, NetworkResponse } from "./BaseService";
import { HttpMethod } from "./utils";

export interface LoginResult {
  token: string,
  username: string,
  role: string
}

function encryptPassword(password: string) {
  return password;
}

export class UserService extends BaseService {
  constructor() {
    super("Account");
  }

  async login(username: string, password: string) {
    password = encryptPassword(password);

    return await this.fetch({
      route: "Login",
      queryParams: {username, password}
    });
  }

  async register(username: string, password: string) {
    password = encryptPassword(password);

    return await this.fetch({
      route: "Register",
      payload: {username, password},
      method: HttpMethod.POST
    });
  }

}
