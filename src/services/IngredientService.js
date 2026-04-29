import { IngredientApi } from "../api/IngredientApi";

export const IngredientService = {
    mapToFE: (data) => {
        return data.map((g) => ({
            id: g.ingredientId,
            name: g.name,
            unitId: g.unitId,
            description: g.description
        }));
    },

    maptoCreateFfe: (g) => {
        return {
            id: g.ingredientId,
            name: g.name,
        }
    },

    fetchAll: async () => {
        const res = await IngredientApi.findAll();
        return IngredientService.mapToFE(res.result);
    },

    create: async (params) => {
        const res = await IngredientApi.create(params);
        return IngredientService.maptoCreateFfe(res.result);
    },
};