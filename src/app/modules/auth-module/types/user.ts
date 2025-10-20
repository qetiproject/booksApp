export interface RegisterUserRequest {
  userId: number,
  emailId: string,
  fullName: string,
  password: string
}

export interface RegisterUserResponse {
  message: string,
  result: boolean,
  data: Omit<RegisterUserRequest, 'password'>
}

export interface LoginCredentials {
  emailId: string;
  password: string;
}

export interface LoginResponse {
  message: string,
  result: boolean,
  data: {
    userId: number,
    emailId: string,
    token: string,
    refreshToken: string
  }
}