import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse, User } from "../types/auth.types";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
