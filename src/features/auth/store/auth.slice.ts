import { createSlice } from "@reduxjs/toolkit";

type UserType = {
  id?: string;
  name: string;
  email?: string;
  role: string;
};

export type AuthStateType = {
  isAuthenticated: boolean;
  userInfo: null | UserType;
};

const initialState: AuthStateType = {
  isAuthenticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setAuthState } = authSlice.actions;

// Export for type inference
export type AuthReducerType = typeof authReducer;
