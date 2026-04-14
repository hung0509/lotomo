export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8443";

// Danh sách endpoint KHÔNG cần gắn token
export const AUTH_WHITELIST = [
  "/auths",
  "/auth/register",
  "/auth/logout",
  "/auth/refresh",
];

export const API_ENDPOINTS = {
  AUTH_LOGIN: "/app/api/v1/auths",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_GOOGLE: "/auth/google",
};