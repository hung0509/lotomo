import { ShiftService } from "../services/ShiftService";



export const useShift = () => {
  const createShift = async (params) => {
      try {
        const data = await ShiftService.create(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API tao ca lam viec...");
      }
    };

    const updateShift = async (params) => {
      try {
        const data = await ShiftService.update(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API cap nhat ca lam viec...");
      }
    };

    const fectAllShifts = async () => {
      try {
        const data = await ShiftService.fetchAll();
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API lay danh sach ca lam viec...");
      }
    };

  return {
    createShift,
    updateShift,
    fectAllShifts
  };
};