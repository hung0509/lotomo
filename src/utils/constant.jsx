export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://192.168.1.34:8443";

// Danh sách endpoint KHÔNG cần gắn token
export const AUTH_WHITELIST = [
  "/auths",
  "/auth/register",
  "/auth/logout",
  "/auth/refresh",
  "/products/post"
];

export const API_ENDPOINTS = {
  AUTH_LOGIN: "/app/api/v1/auths",
  OPTION_GROUP: "/app/api/v1/option-groups",
  OPTION_ITEM: "/app/api/v1/option-items",
  PRODUCT: "/app/api/v1/products",
};