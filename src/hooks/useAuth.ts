// hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { LoginRequest } from "../types/auth.type";
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<TokenResponse, Error, LoginRequest>({
    mutationFn: async (credentials) => {
      const response = await baseApi.post<unknown, LoginRequest>(
        "/auth/login",
        credentials,
      );
      return parseTokenResponse(response);
    },
    onSuccess: (data) => {
      tokenManager.setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresIn
          ? Date.now() + data.expiresIn * 1000
          : undefined,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      window.location.assign("/reports");
    },
  });
}
