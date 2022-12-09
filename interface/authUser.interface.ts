export interface authRegister {
  name: string;
  email: string;
  password: string;
  image: string;
  rol: Roles;
}
export enum Roles {
  admin = "admin",
  user = "user",
}
export interface authLogin {
  email: string;
  password: string;
}

export interface verificateCode {
  email: string;
  code: string;
}

export interface sendEmailInterface {
  email: string;
  code: string;
  type: string;
}
