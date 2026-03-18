import axios from "axios";

import type { LoginRequest, LoginResponse } from "../types/auth.type";
import api from "./api";
import type { ApiResponse } from "../types/api.type";
export async function login(
  body: LoginRequest,
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      body,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error message: ", error.message);
      throw new Error(`Axios error: ${error.message}`);
    }

    throw error;
  }
}

// export async function logout(refreshToken: string): Promise<void> {
//   try {
//     if (refreshToken) {
//       await apiSpring.post("/v1/auth/logout", null, {
//         headers: {
//           Authorization: `Bearer ${refreshToken}`,
//         },
//       });
//     }
//   } catch (error) {
//     console.log("Lỗi gọi api logout", error);
//   } finally {
//     localStorage.clear();
//   }
// }
