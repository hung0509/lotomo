import { ShiftScheduleApi } from "../api/ShiftSchedule.Api";



export const ShiftScheduleService = {
    create: async (params) => {
        const res = await ShiftScheduleApi.create(params);
        return res.result;
    },

    fetchAll: async (params) => {
        const res = await ShiftScheduleApi.fetchAll(params);
        return res.result;
    },
};