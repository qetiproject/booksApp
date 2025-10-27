import { LoginResponse, RegisterUserResponse } from "@auth-module";

export interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  response: RegisterUserResponse | LoginResponse | null;
  activeUserId: number | null;
}
