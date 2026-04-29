import { IngredientStockApi } from "../api/IngredientStockApi";
import { ShiftApi } from "../api/ShiftApi";
import { UserApi } from "../api/UserApi";


export const IngredientStockService = {
    fetchAll: async (param) => {
        const res = await IngredientStockApi.fetchAll(param);
        return res.result;
    },
    update: async (params) => {
        const res = await IngredientStockApi.update(params);
        return res.result;
    },
};