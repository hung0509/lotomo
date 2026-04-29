import axiosClient from "../services/axiosClient";
import { API_ENDPOINTS } from "../utils/constant";


export const OrderApi = {
  create: async (params) => {
    const res = await axiosClient.post(API_ENDPOINTS.ORDER, params);
    return res;
  },
  update: async (params) => {
    const res = await axiosClient.put(API_ENDPOINTS.ORDER, params);
    return res;
  },  
  changeStatus: async (params) => {
    const res = await axiosClient.put(API_ENDPOINTS.CHANGE_STATUS_ORDER, params);
    return res;
  },
  fetchAll: async () => {
    const res = await axiosClient.get(API_ENDPOINTS.ORDER);
    return res;
  }
};