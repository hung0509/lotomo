import { ShiftService } from "../services/ShiftService";
import { UserService } from "../services/UserService";


export const useUser = () => {
    const fectAllUsers = async () => {
      try {
        const data = await UserService.fetchAll();
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API lay danh sach nhan vien...");
      }
    };

  return {
    fectAllUsers
  };
};