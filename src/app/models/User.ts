export enum UserRole {
  Unclear = "Unclear",
  User = "User",
  Admin = "Admin",
}


export class User {
  public username: string;
  public role: UserRole;
  public token: string;


  constructor(json) {
    Object.assign(this,json);
    this.role = json.role as UserRole;
  }

}
