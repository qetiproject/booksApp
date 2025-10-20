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

export interface UserResponse  {
  data: unknown[],
  pageNumber: number,
  pageSize: number,
  totalRecords: number
}