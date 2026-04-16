import { OptionGroupApi } from "../api/OptionGroupApi ";


export const OptionGroupService = {
  mapToFE: (data) => {
    return data.map((g) => ({
      id: g.optionGroupId,
      name: g.name,
      type: g.type,
      isRequired: g.isRequired,
      items: (g.optionItems || []).map((i) => ({
        id: i.optionItemId,
        name: i.name,
        price: i.price,
        status: i.isActive === "Y" ? "ACTIVE" : "INACTIVE",
      })),
    }));
  },

  mapToBE: (data) => {
    return data.map((g) => ({
      optionGroupId: g.id,
      name: g.name,
      type: g.type,
      isRequired: g.isRequired,
      optionItems: (g.items || []).map((i) => ({
        optionItemId: i.id,
        name: i.name,
        price: i.price,
        isActive: i.status === "ACTIVE" ? "Y" : "N",
      })),
    }));
  },

  findAll: async () => {
    const res = await OptionGroupApi.findAll();
    return OptionGroupService.mapToFE(res.result);
  },

  create: async (params) => {
    const res = await OptionGroupApi.create(params);
    return OptionGroupService.mapToFE(res.result);;
  }
};