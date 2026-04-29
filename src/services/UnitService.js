import { UnitApi } from "../api/UnitApi";


export const UnitService = {
    mapListToFE: (data) => {
        return data.map((g) => ({
            id: g.unitId,
            code: g.code,
            name: g.name
        }));
    },

    fetchAll: async () => {
        const res = await UnitApi.fetchAll();
        return UnitService.mapListToFE(res.result);
    },
};