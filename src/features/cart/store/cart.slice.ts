import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartDataType, CartItem, AddProductToCartResponseType } from "../types/cart.typs";

export interface CartStateType {
  numOfCartItems: number;
  cartId: string | null;
  products: CartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartStateType = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInfo: (state, action: PayloadAction<AddProductToCartResponseType>) => {
      state.cartId = action.payload?.cartId ?? null;
      state.numOfCartItems = action.payload?.numOfCartItems ?? 0;
      // Guard against missing or differently-shaped payloads coming from
      // add-to-cart responses by falling back to an empty array.
      state.products = action.payload?.data?.products ?? [];
      state.totalCartPrice = action.payload?.data?.totalCartPrice ?? 0;
    },
  },
});

export const { setCartInfo } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export type CartReducerType = typeof cartReducer;
