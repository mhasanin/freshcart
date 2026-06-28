import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  _id?: string;
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  createdAt?: string;
}

export type AuthStateType = {
  isAuthenticated: boolean;
  userInfo: null | UserData;
};

const initialState: AuthStateType = {
  isAuthenticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthStateType>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      } else if (action.payload.name) {
        state.userInfo = action.payload as UserData;
      }
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setAuthState, updateUserInfo } = authSlice.actions;

// Export for type inference
export type AuthReducerType = typeof authReducer;
