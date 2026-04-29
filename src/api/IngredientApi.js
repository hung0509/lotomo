import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";

export const IngredientApi = {
    findAll: async () => {
        const res = await axiosClient.get(API_ENDPOINTS.INGREDIENT);
        return res;
    },
    create: async (params) => {
        const res = await axiosClient.post(API_ENDPOINTS.INGREDIENT, params);
        return res;
  },
};
