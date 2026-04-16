import { useState, useCallback } from "react";
import { OptionGroupService } from "../services/OptionGroupService";
import { loadingEmitter } from "../utils/LoadingEmitter";

export const useOptionGroup = () => {
  const [error, setError] = useState(null);

  const fetchAll = async () => {
      try {
        const data = await OptionGroupService.findAll();
        
        return data;
      } catch (err) {
        throw err;
      } finally {
        console.log("CALL API tao option group...");
      }
    };

  const create = async (params) => {
      try {
        const data = await OptionGroupService.create(params);
        
        return data;
      } catch (err) {
        setError(err.message || "Login failed");
        throw err;
      } finally {
        console.log("CALL API tao option group...");
      }
    };

  return {
    error,
    fetchAll,
    create
  };
};