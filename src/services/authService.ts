// services/authService.ts
import type { LoginRequest, LoginResponse, User } from "../types/auth.type";
import type { ApiResponse } from "../types/api.type";
import api from "./api";

export const authService = {
  login: async (body: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const res = await api.post<ApiResponse<LoginResponse>>("/auth/login", body);
    return res.data;
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const res = await api.get("/users/me");
    return res.data;
  },
};
