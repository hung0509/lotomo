import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";

export const authenticationApi = {
    login: async (credential) => {
        const res = await axiosClient.post(API_ENDPOINTS.AUTH_LOGIN, credential);
        return res;
    }
};
