import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";


export const ShiftApi = {
    create: async (params) => {
        const res = await axiosClient.post(API_ENDPOINTS.SHIFT, params);
        return res;
    },
    update: async (params) => {
        const res = await axiosClient.put(API_ENDPOINTS.SHIFT, params);
        return res;
    },
    fetchAll: async (params) => {
        return await axiosClient.get(API_ENDPOINTS.SHIFT, { params });
    }
};