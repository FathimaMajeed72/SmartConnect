import api from "@/core/api/axios";
import type { LoginFormData } from "../schemas/login.schema";
import type { LoginResponse } from "../types/auth.types";

export const login = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data.data;
};
 
export const refreshSession = async () => {
  const response = await api.post("/auth/refresh-token");

  console.log(response.data);

  return response.data.data;
};