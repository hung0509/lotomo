import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";


export const ProductApi = {
    create: async (params) => {
        const res = await axiosClient.post(API_ENDPOINTS.PRODUCT, params);
        return res;
    },
    update: async (params) => {
        const res = await axiosClient.put(API_ENDPOINTS.PRODUCT, params);
        return res;
    },
    fetchAll: async (params) => {
        return await axiosClient.get(API_ENDPOINTS.PRODUCT, { params });
    },
    fetchByProductId: async (productId) => {
        const res = await axiosClient.get(
            `${API_ENDPOINTS.PRODUCT}/${productId}`
        );
        return res;
    },
    fetchForPos: async (params) => {
        return await axiosClient.get(`${API_ENDPOINTS.PRODUCT}/pos`, { params });
    },
};