import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";


export const OptionGroupApi = {
  findAll: async () => {
    const res = await axiosClient.get(API_ENDPOINTS.OPTION_GROUP);
    return res;
  },
  create: async (params) => {
    const res = await axiosClient.post(API_ENDPOINTS.OPTION_GROUP, params);
    return res;
  }
};