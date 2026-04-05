// hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { LoginRequest } from "../types/auth.type";
import api from "@/services/api";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);

      queryClient.invalidateQueries({ queryKey: ["me"] });
      window.location.href = "/"; // Redirect to home page after successful login
    },

    onError: (error) => {
      console.error("Login error:", error);
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => authService.getMe(),
    staleTime: 1000 * 60 * 5,
  });
}
