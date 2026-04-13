import api from "./apiconfig";
import { saveToken, clearAuth } from "./authStorage";

export const login = async ({ email, password }) => {
  const res = await api.post("/Authenticate/token", { email, password });
  const token = res?.data?.result?.token; // chỉnh theo response thật của bạn
  if (token) saveToken(token);
  return res.data;
};

export const logout = () => clearAuth();