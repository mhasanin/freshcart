import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressItem } from "../types/addresses.types";

export interface AddressesStateType {
  items: AddressItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AddressesStateType = {
  items: [],
  isLoading: false,
  error: null,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<AddressItem[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setAddressesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAddressesError: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const addressesReducer = addressesSlice.reducer;
export const { setAddresses, setAddressesLoading, setAddressesError } = addressesSlice.actions;