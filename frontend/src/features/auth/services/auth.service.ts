import api from "@/core/api/axios";
import type { LoginFormData } from "../schemas/login.schema";
import type { LoginResponse } from "../types/auth.types";
import { API_ROUTES } from "@/core/constants/api-routes";

export const login = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await api.post(API_ROUTES.AUTH.LOGIN, data);
  return response.data.data;
};
 
export const refreshSession = async () => {
  const response = await api.post(API_ROUTES.AUTH.REFRESH_TOKEN);

  console.log(response.data);

  return response.data.data;
};

export const logoutUser = async () => {
  const response = await api.post(API_ROUTES.AUTH.LOGOUT);

  return response.data.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post(API_ROUTES.AUTH.FORGOT_PASSWORD, {
    email,
  });

  return response.data.data;
};

export const verifyResetOtp = async (
  email: string,
  otp: string
) => {
  const response = await api.post(API_ROUTES.AUTH.VERIFY_RESET_OTP, {
    email,
    otp,
  });

  return response.data.data;
};

export const resendOtp = async (email: string) => {
  const response = await api.post( API_ROUTES.AUTH.RESEND_OTP, {
    email,
  });

  return response.data.data;
};

export const resetPassword = async (
  email: string,
  password: string
) => {
  const response = await api.post( API_ROUTES.AUTH.RESET_PASSWORD, {
    email,
    password,
  });

  return response.data.data;
};


export interface ActivateAccountData {
  token: string;
  password: string;
}

export const activateAccount = async (
  data: ActivateAccountData
) => {
  const response = await api.post(API_ROUTES.AUTH.ACTIVATE, data);

  return response.data.data;
};