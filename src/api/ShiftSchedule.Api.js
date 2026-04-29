import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";


export const ShiftScheduleApi = {
    create: async (params) => {
        const res = await axiosClient.post(API_ENDPOINTS.SHIFT_SCHEDULE, params);
        return res;
    },
    fetchAll: async (params) => {
        return await axiosClient.get(API_ENDPOINTS.SHIFT_SCHEDULE, { params });
    }
};