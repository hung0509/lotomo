import { useState } from "react";
import { AuthenticationService } from "../services/authenticationService";
import { loadingEmitter } from "../utils/LoadingEmitter";

export const useAuth = () => {
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const data = await AuthenticationService.login(credentials);
      console.log(data);
      localStorage.setItem("access_token", data.result.token);
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
