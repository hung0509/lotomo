import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";


export const UnitApi = {
    fetchAll: async (params) => {
        return await axiosClient.get(API_ENDPOINTS.UNIT, { params });
    }
};