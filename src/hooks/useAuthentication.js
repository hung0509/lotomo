import { useState } from "react";
import { authenticationApi } from "../services/authenticationApi";



export const useAuth = () => {
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const data = await authenticationApi.login(credentials);
      localStorage.setItem("access_token", data.token);
      return data;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      console.log("CALL API đăng nhập ...");
    }
  };

  return {
    login,
    error,
  };
};
