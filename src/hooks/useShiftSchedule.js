import { ShiftScheduleService } from "../services/ShiftScheduleService";



export const useShiftSchedule = () => {
  const createShiftSchedule = async (params) => {
      try {
        const data = await ShiftScheduleService.create(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API tao lịch lam viec...");
      }
    };

    const fetchAllShiftSchedule = async (params) => {
      try {
        const data = await ShiftScheduleService.fetchAll(params);
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API lay danh sach lịch lam viec...");
      }
    };

  return {
    createShiftSchedule,
    fetchAllShiftSchedule
  };
};