import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SettingsStateType } from "../types/settings.types";

const initialState: SettingsStateType = {
  isLoading: false,
  error: null,
  successMessage: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.successMessage = null;
      state.error = null;
    },
    setSettingsError: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    setSettingsSuccess: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.successMessage = action.payload;
      state.error = null;
    },
    clearSettingsStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const {
  setSettingsLoading,
  setSettingsError,
  setSettingsSuccess,
  clearSettingsStatus,
} = settingsSlice.actions;