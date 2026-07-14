export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status?: "ACTIVE" | "BLOCKED";
}
