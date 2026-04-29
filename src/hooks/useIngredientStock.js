import { IngredientStockService } from "../services/IngredientStockService";

export const useuseIngredientStock = () => {
  const fetchAll = async (param) => {
    try {
      const data = await IngredientStockService.fetchAll(param);

      return data;
    } catch (err) {
      throw err;
    } finally {
      console.log("CALL API lay danh sach giao dich..");
    }
  };

  const updateStock = async (params) => {
    try {
      const data = await IngredientStockService.update(params);

      return data;
    } catch (err) {
      throw err;
    } finally {
      console.log("CALL API cap nhat kho...");
    }
  };


  return {
    fetchAll,
    updateStock
  };
};