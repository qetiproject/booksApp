import { AuthTokens } from "../store/auth.store";

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string; 
  image: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export type LoginRequest = User & AuthTokens;

export interface RegisterUserRequest {
  userId: number,
  emailId: string,
  fullName: string,
  password: string
}

export interface RegisterUserResponse {
  message: string,
  result: boolean,
  data: RegisterUserRequest
}