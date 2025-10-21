import { LoginResponse, RegisterUserResponse } from "@auth-types/auth";

export interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  response: RegisterUserResponse | LoginResponse | null;
}
