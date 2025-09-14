export type User = {
  id: string;
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
  user: User | null;
  tokens: AuthTokens | null; 
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}