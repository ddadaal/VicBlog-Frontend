export enum UserRole {
  Unclear = "Unclear",
  User = "User",
  Admin = "Admin",
}


export class User {
  public name: string;
  public role: UserRole;
  public token: string;


  constructor(name: string, role: string, token: string) {
    this.name = name;
    this.role = UserRole[role];
    this.token = token;
  }

  static parse(obj: any) {
    return new User(obj.name, obj.role, obj.token);
  }
}