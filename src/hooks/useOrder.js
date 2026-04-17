import { OrderService } from "../services/OrderService";


export const useOrder = () => {
  const createOrder = async (params) => {
      try {
        const data = await OrderService.create(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API tao hoa don...");
      }
    };

    const updateOrder = async (params) => {
      try {
        const data = await OrderService.update(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API cap nhat hoa don...");
      }
    };

    const fectAllOrdersForToday = async () => {
      try {
        const data = await OrderService.fetchAll();
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API lay danh sach hoa don...");
      }
    };

  return {
    createOrder,
    updateOrder,
    fectAllOrdersForToday
  };
};