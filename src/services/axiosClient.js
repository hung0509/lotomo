import axios from "axios";

import { API_BASE_URL, AUTH_WHITELIST } from "../utils/constant";
import { loadingEmitter } from "../utils/LoadingEmitter";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    const isWhitelisted = AUTH_WHITELIST.some((path) =>
      config.url?.includes(path)
    );

    if (token && !isWhitelisted) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Emit sự kiện start loading
    loadingEmitter.emit("start");
    return config;
  },
  (error) => {
    loadingEmitter.emit("end");
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    loadingEmitter.emit("end");
    return response.data;
  },
  (error) => {
    loadingEmitter.emit("end");
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
