import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";

export const IngredientStockApi = {
    fetchAll: async (params) => {
        return await axiosClient.get(API_ENDPOINTS.INGREDIENT_STOCKS, { params });
    },
    update: async (params) => {
    const res = await axiosClient.put(API_ENDPOINTS.INGREDIENT_STOCKS, params);
    return res;
  },
};