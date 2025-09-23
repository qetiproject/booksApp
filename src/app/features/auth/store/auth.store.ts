import { UserProfileResponse } from "../types/user-profile";

export type AuthUserResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string; 
  image: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: AuthUserResponse | null;
  userProfile: UserProfileResponse | null;
  tokens: AuthTokens | null; 
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

