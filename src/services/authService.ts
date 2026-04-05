/* eslint-disable @typescript-eslint/no-explicit-any */
// services/authService.ts
import type {
  LoginRequest,
  AuthResponse,
  User,
  RegisterRequest,
} from "../types/auth.type";
import type { ApiResponse } from "../types/api.type";
import api from "./api";

export const authService = {
  login: async (
    LoginRequest: LoginRequest,
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const res = await api.post("/auth/login", LoginRequest);

      console.log("Login response api :", res);

      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Login error api :", error);

      throw new Error(error?.response?.data?.message || "Login failed");
    }
  },

  register: async (
    RegisterRequest: RegisterRequest,
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const res = await api.post("/auth/register", RegisterRequest);
      return res.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Register failed");
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    try {
      const res = await api.post("/auth/forgot-password", email);
      return res.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "forgot password failed",
      );
    }
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const res = await api.get("/users/me");
    return res.data;
  },
};
