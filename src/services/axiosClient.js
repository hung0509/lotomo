import axios from "axios";
import { API_BASE_URL, AUTH_WHITELIST } from "../utils/constant";
import { loadingEmitter } from "../utils/LoadingEmitter";

let requestCount = 0; 

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 
    "Content-Type": "application/json",
    'ngrok-skip-browser-warning': 'true'
   },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    const isWhitelisted = AUTH_WHITELIST.some(
      (item) =>
        config.url?.includes(item.url) &&
        config.method?.toUpperCase() === item.method
    );

    if (token && !isWhitelisted) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 
    requestCount++;
    loadingEmitter.emit("start");

    return config;
  },
  (error) => {
    //
    requestCount = Math.max(0, requestCount - 1);
    if (requestCount === 0) loadingEmitter.emit("end");

    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // 
    requestCount = Math.max(0, requestCount - 1);
    if (requestCount === 0) loadingEmitter.emit("end");

    return response.data;
  },
  (error) => {
    // 
    requestCount = Math.max(0, requestCount - 1);
    if (requestCount === 0) loadingEmitter.emit("end");

    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({
        code: data?.code ?? false,
        message: data?.message || "Đã xảy ra lỗi, vui lòng thử lại",
        status,
      });
    }
    return Promise.reject({
      code: false,
      message: "Không thể kết nối đến máy chủ",
      status: 0,
    });
  }
);

export default axiosClient;