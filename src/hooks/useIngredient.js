import { useState } from "react";
import { AuthenticationService } from "../services/authenticationService";
import { loadingEmitter } from "../utils/LoadingEmitter";
import { IngredientService } from "../services/IngredientService";

export const useIngredient = () => {

  const fetchAllIngredient = async () => {
    try {
      const data = await IngredientService.fetchAll();

      return data;
    } catch (err) {

      throw err;
    } finally {
      console.log("CALL API lấy nguyên liệu...");
    }
  };

    const createIngredient = async (params) => {
        try {
          const data = await IngredientService.create(params);
          
          return data;
        } catch (err) {
          throw err;
        } finally {
          console.log("CALL API tao nguyen vat lieu...");
        }
      };

  return {
    fetchAllIngredient, 
    createIngredient
  };
};
