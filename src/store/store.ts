import {
  authReducer,
  type AuthStateType,
} from "@/features/auth/store/auth.slice";
import {
  cartReducer,
  type CartStateType,
} from "@/features/cart/store/cart.slice";
import {
  wishlistReducer,
  type WishlistStateType,
} from "@/features/wishlist/store/wishlist.slice";
import {
  configureStore,
  type Reducer,
  type UnknownAction,
} from "@reduxjs/toolkit";

export type RootStateType = {
  auth: AuthStateType;
  cart: CartStateType;
  wishlist: WishlistStateType;
};

export type PreloadedStateType = Partial<RootStateType>;

export function createStore(preloadedState?: PreloadedStateType) {
  return configureStore({
    reducer: {
      auth: authReducer as Reducer<
        AuthStateType,
        UnknownAction,
        AuthStateType | undefined
      >,
      cart: cartReducer as Reducer<
        CartStateType,
        UnknownAction,
        CartStateType | undefined
      >,
      wishlist: wishlistReducer as Reducer<
        WishlistStateType,
        UnknownAction,
        WishlistStateType | undefined
      >,
    },
    preloadedState,
  });
}

export type AppStoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStoreType["getState"]>;
export type AppDispatch = AppStoreType["dispatch"];
