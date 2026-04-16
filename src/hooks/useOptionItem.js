
import { OptionItemService } from "../services/OptionItemService";

export const useOptionItem = () => {
  const createItem = async (params) => {
      try {
        const data = await OptionItemService.create(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API tao option item...");
      }
    };

    const updateItem = async (params) => {
      try {
        const data = await OptionItemService.update(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API cap nhat option item...");
      }
    };

  return {
    createItem,
    updateItem
  };
};