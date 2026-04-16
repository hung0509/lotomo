import { authenticationApi } from "../api/AuthenticationApi";

export const AuthenticationService = {
  login: async (credential) => {
    const res = await authenticationApi.login(credential);
    return res;
  }
};