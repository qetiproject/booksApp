import { RegisterUserResponse } from "../types/user";

export interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  response: RegisterUserResponse | null;
}
