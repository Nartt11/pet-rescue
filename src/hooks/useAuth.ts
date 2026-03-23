// hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const useAuth = () => {
  const queryClient = useQueryClient();

  // 🔹 token inline
  const getToken = () => localStorage.getItem("accessToken");
  const setToken = (token: string) =>
    localStorage.setItem("accessToken", token);
  const removeToken = () => localStorage.removeItem("accessToken");

  // 🔹 Query: /me
  const { data: User, isLoading } = useQuery({
    queryKey: ["me"], // inline luôn
    queryFn: authService.getMe,
    enabled: !!getToken(),
    retry: false,
  });

  const user = User?.data;

  // 🔹 Login
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (res) => {
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      localStorage.setItem("refreshToken", refreshToken);

      setToken(accessToken);

      // refetch user
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });

  // 🔹 Logout
  const logout = () => {
    removeToken();

    queryClient.removeQueries({
      queryKey: ["me"],
    });
  };

  return {
    // state
    user,
    isLoading,
    isAuthenticated: !!user,

    // login
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // logout
    logout,
  };
};
