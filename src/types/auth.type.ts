import type z from "zod";
import type { loginSchema, registerSchema } from "../libs/schemas/auth-schemas";

export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;

export interface AuthResponse {
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
