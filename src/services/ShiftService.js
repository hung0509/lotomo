import { ShiftApi } from "../api/ShiftApi";


export const ShiftService = {
    create: async (params) => {
        const res = await ShiftApi.create(params);
        return res.result;
    },

    update: async (params) => {
        const res = await ShiftApi.update(params);
        return res.result;
    },

    fetchAll: async () => {
        const res = await ShiftApi.fetchAll();
        return res.result;
    },
};