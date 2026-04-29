import { ShiftService } from "../services/ShiftService";
import { UnitService } from "../services/UnitService";
import { UserService } from "../services/UserService";


export const useUnit = () => {
    const fectAllUnits = async () => {
      try {
        const data = await UnitService.fetchAll();
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API lay danh sach don vi tinh...");
      }
    };

  return {
    fectAllUnits
  };
};