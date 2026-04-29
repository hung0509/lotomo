import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";


export const UserApi = {
    fetchAll: async (params) => {
        return await axiosClient.get(API_ENDPOINTS.USER, { params });
    }
};