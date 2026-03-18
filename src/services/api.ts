import axios from "axios";
import type { AxiosInstance } from "axios";

// const API_PORT = import.meta.env.VITE_API_PORT_SPRING || "8080";

const api: AxiosInstance = axios.create({
  baseURL: `https://pet-rescue-api-0uhx.onrender.com/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - thêm token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      // Không có quyền
      window.location.href = "/forbidden";
    }

    return Promise.reject(error);
  },
);

export default api;
