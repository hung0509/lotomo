import { ProductApi } from "../api/ProductApi";


export const ProductService = {
  mapToFE: (data) => {
    return {
      id: data.productId,
      name: data.name,
      price: data.basePrice,
      status: data.isActive === "Y" ? "ACTIVE" : "INACTIVE",
    }
  },

  mapListToFE: (data) => {
    return data.map((g) => ({
      id: g.productId,
      name: g.name,
      price: g.basePrice,
      status: g.isActive === "Y" ? "ACTIVE" : "INACTIVE",
    }));
  },

  mapDetailToFe: (data) => {
    // ✅ selected items
    const selectedItems = data.options.flatMap(group =>
      group.optionItems
        .filter(item => item.isActive === "Y" || item.ingredients?.length > 0)
        .map(item => item.optionItemId)
    );

    // ✅ options (convert về FE structure)
    const options = data.options.map(group => ({
      id: group.optionGroupId,
      name: group.name,
      items: group.optionItems.map(item => ({
        id: item.optionItemId,
        name: item.name,
        price: item.price,
      })),
    }));

    // ✅ recipes (QUAN TRỌNG NHẤT)
    const recipes = {};
    data.options.forEach(group => {
      group.optionItems.forEach(item => {
        if (item.ingredients?.length > 0) {
          recipes[String(item.optionItemId)] = item.ingredients.map(i => ({
            ingredientId: i.ingredientId,
            quantity: i.quantity,
          }));
        }
      });
    });

    return {
      id: data.productId,
      name: data.name,
      price: data.basePrice,
      image: data.imageUrl,
      categoryId: data.categoryId,
      status: data.isActive === "Y" ? "ACTIVE" : "INACTIVE",

      selectedItems,
      options,
      recipes, // 🔥 thêm cái này
    };
  },

  mapData: (apiData) => {
    return apiData.map((p) => ({
      id: p.productId,
      name: p.name,
      price: p.basePrice,
      image: p.imageUrl || "https://via.placeholder.com/150",

      options: (p.options || []).map((g) => ({
        id: g.optionGroupId,
        name: g.name,
        type: g.type,               // ✅ thêm
        isRequired: g.isRequired,   // ✅ thêm

        items: (g.optionItems || []).map((i) => ({
          id: i.optionItemId,
          name: i.name,
          price: i.price,
        })),
      })),
    }));
  },

  create: async (params) => {
    const res = await ProductApi.create(params);
    return ProductService.mapToFE(res.result);;
  },

  update: async (params) => {
    const res = await ProductApi.update(params);
    return ProductService.mapToFE(res.result);
  },

  fetchAll: async (params) => {
    const res = await ProductApi.fetchAll(params);
    return ProductService.mapListToFE(res.result);
  },

  findById: async (productId) => {
    const res = await ProductApi.fetchByProductId(productId);
    return ProductService.mapDetailToFe(res.result);
  },

  fetchForPos: async (params) => {
    const res = await ProductApi.fetchForPos(params);
    return ProductService.mapData(res.result);
  },
};