export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8443";

// Danh sách endpoint KHÔNG cần gắn token
export const AUTH_WHITELIST = [
  { url: "/auths", method: "POST" },
  { url: "/auth/register", method: "POST" },
  { url: "/auth/logout", method: "POST" },
  { url: "/auth/refresh", method: "POST" },
  { url: "/products/pos", method: "GET" },
   { url: "/order", method: "POST" },
];

export const API_ENDPOINTS = {
  AUTH_LOGIN: "/app/api/v1/auths",
  OPTION_GROUP: "/app/api/v1/option-groups",
  OPTION_ITEM: "/app/api/v1/option-items",
  PRODUCT: "/app/api/v1/products",
  ORDER: "/app/api/v1/orders",
  CHANGE_STATUS_ORDER: "/app/api/v1/orders/change-status",
  SHIFT: "/app/api/v1/shifts",
  SHIFT_SCHEDULE: "/app/api/v1/shift-schedules",
  USER: "/app/api/v1/users",
  INGREDIENT: "/app/api/v1/ingredients",
  UNIT: "/app/api/v1/units",
  INGREDIENT_STOCKS: "/app/api/v1/ingredient-stocks"
};