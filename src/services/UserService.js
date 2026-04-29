import { ShiftApi } from "../api/ShiftApi";
import { UserApi } from "../api/UserApi";


export const UserService = {
    fetchAll: async () => {
        const res = await UserApi.fetchAll();
        return res.result;
    },
};