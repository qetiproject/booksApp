import { RegisterUserResponse } from "../types/user";

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

// export interface AuthState {
//   user: AuthUserResponse | null;
//   userProfile: UserProfileResponse | null;
//   tokens: AuthTokens | null; 
//   isLoggedIn: boolean;
//   loading: boolean;
//   error: string | null;
//   isRegistered: boolean;
//   userRegistered: RegisterUserResponse | null;
// }



export interface AuthState {
  loading: boolean;
  userRegistered: RegisterUserResponse | null;
}
