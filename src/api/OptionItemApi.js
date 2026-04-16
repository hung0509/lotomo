import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";


export const OptionItemApi = {
  create: async (params) => {
    const res = await axiosClient.post(API_ENDPOINTS.OPTION_ITEM, params);
    return res;
  },
  update: async (params) => {
    const res = await axiosClient.put(API_ENDPOINTS.OPTION_ITEM, params);
    return res;
  }
};