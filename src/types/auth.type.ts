export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

type UserStatus = "PENDING_VERIFICATION" | "ACTIVE" | "INACTIVE" | "BANNED";
export interface User {
  readonly userId: number;
  username: string;
  email: string;
  fullName: string;
  status: UserStatus;
  emailVerified: boolean;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
