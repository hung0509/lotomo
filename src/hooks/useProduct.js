import { ProductService } from "../services/ProductService";

export const useProduct = () => {
  const createProduct = async (params) => {
      try {
        const data = await ProductService.create(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API tao product...");
      }
    };

    const updateProduct = async (params) => {
      try {
        const data = await ProductService.update(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API cap nhat product ...");
      }
    };

    const fetchAll = async (params) => {
      try {
        const data = await ProductService.fetchAll(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API fetch all product...");
      }
    };

    
    const findById = async (productId) => {
      try {
        const data = await ProductService.findById(productId);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API fetch all product...");
      }
    };

    const fetchForPos = async (params) => {
      try {
        const data = await ProductService.fetchForPos(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API fetch all product...");
      }
    };

  return {
    createProduct,
    updateProduct,
    fetchAll,
    findById,
    fetchForPos
  };
};