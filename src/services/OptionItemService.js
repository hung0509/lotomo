import { OptionItemApi } from "../api/OptionItemApi";


export const OptionItemService = {
  mapToFE: (data) => {
    return {
         id: data.optionItemId,
        name: data.name,
        price: data.price,
        status: data.isActive === "Y" ? "ACTIVE" : "INACTIVE",
    }
  },

  create: async (params) => {
    const res = await OptionItemApi.create(params);
    return OptionItemService.mapToFE(res.result);;
  },

  update: async (params) => {
    const res = await OptionItemApi.update(params);
    return OptionItemService.mapToFE(res.result);;
  },
};