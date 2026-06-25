import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  WishlistItem,
  GetWishlistResponseType,
} from "../types/wishlist.types";

export interface WishlistStateType {
  count: number;
  products: WishlistItem[];
  wishlistIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistStateType = {
  count: 0,
  products: [],
  wishlistIds: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistInfo: (
      state,
      action: PayloadAction<GetWishlistResponseType>,
    ) => {
      state.count = action.payload?.count ?? 0;
      state.products = action.payload?.data ?? [];
      state.wishlistIds = action.payload?.data?.map((item) => item._id) ?? [];
    },
    updateWishlistIds: (state, action: PayloadAction<string[]>) => {
      state.wishlistIds = action.payload;
    },
    clearWishlist: (state) => {
      state.count = 0;
      state.products = [];
      state.wishlistIds = [];
    },
  },
});

export const { setWishlistInfo, updateWishlistIds, clearWishlist } =
  wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;

export type WishlistReducerType = typeof wishlistReducer;
