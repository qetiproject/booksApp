export enum Role {
  'Agent' = 'Agent',
  'Customer' = 'Customer'
}

export interface UserData {
  userId: number,
  userName: string,
  emailId: string,
  fullName: string,
  role: Role,
  createdDate: string,
  password: number,
  projectName: string,
  refreshToken: string,
  refreshTokenExpiryTime: string
}
export type SafeUserData = Omit<UserData, 'password' | 'refreshToken' | 'refreshTokenExpiryTime'>;

export interface UserResponse {
  totalRecords: number,
  pageNumber: number,
  pageSize: number,
  data: UserData[];
}

export interface Users {
  totalRecords: number,
  pageNumber: number,
  pageSize: number,
  data: SafeUserData[];
}