import axios from "axios";
import { store } from "@/app/store/store";
import { refreshSession } from "@/features/auth/services/auth.service";
import { setCredentials, logout } from "@/features/auth/slices/authSlice";

import type { InternalAxiosRequestConfig } from "axios";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;

    const isAuthRoute = originalRequest.url?.startsWith("/auth/");

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshSession();

        store.dispatch(setCredentials(data));

        return api(originalRequest);
      } catch {
        store.dispatch(logout());

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
