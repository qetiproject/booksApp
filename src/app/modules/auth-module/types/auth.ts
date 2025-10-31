export interface RegisterCredentionals {
  userId: number,
  emailId: string,
  fullName: string,
  password: string
}

export interface RegisterUserResponse {
  message: string,
  result: boolean,
  data: Omit<RegisterCredentionals, 'password'>
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

export interface ResetPassword {
  email: string;
  otp: string;
  newPassword: string;
}