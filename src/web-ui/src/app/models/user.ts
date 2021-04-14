export interface IUser {
  token: string;
  id: string;
  email: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
