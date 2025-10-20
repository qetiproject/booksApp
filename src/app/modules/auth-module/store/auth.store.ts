import { LoginResponse, RegisterUserResponse } from "../types/user";

export interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  response: RegisterUserResponse | LoginResponse | null;
}
