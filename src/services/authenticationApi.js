import { API_ENDPOINTS } from "../utils/constant";
import axiosClient from "./axiosClient";


export const authenticationApi = {
  login: (credential) => axiosClient.post(API_ENDPOINTS.AUTH_LOGIN, credential),

  logout: () => axiosClient.post(API_ENDPOINTS.AUTH_LOGOUT),
};
