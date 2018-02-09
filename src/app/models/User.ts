export enum UserRole {
  Unclear,
  User,
  Admin,
}


export class User {
  public token: string;
  public name: string;
  public role: UserRole;

  constructor(json: any) {
    this.token = json.token;
    this.name = json.username;
    this.role = json.role;
  }
}