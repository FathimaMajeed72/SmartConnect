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

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data.data;
};

export const verifyResetOtp = async (
  email: string,
  otp: string
) => {
  const response = await api.post("/auth/verify-reset-otp", {
    email,
    otp,
  });

  return response.data.data;
};

export const resendOtp = async (email: string) => {
  const response = await api.post("/auth/resend-otp", {
    email,
  });

  return response.data.data;
};

export const resetPassword = async (
  email: string,
  password: string
) => {
  const response = await api.post("/auth/reset-password", {
    email,
    password,
  });

  return response.data.data;
};