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
  addressesReducer,
  AddressesStateType,
} from "@/features/profile/addresses/store/addresses.slice";

import {
  configureStore,
  type Reducer,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { settingsReducer } from "@/features/profile/settings/store/settings.slice";
import { SettingsStateType } from "@/features/profile/settings/types/settings.types";

export type RootStateType = {
  auth: AuthStateType;
  cart: CartStateType;
  wishlist: WishlistStateType;
  addresses: AddressesStateType;
  settings: SettingsStateType;
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
      addresses: addressesReducer as Reducer<
        AddressesStateType,
        UnknownAction,
        AddressesStateType | undefined
      >,
      settings: settingsReducer as Reducer<
        SettingsStateType,
        UnknownAction,
        SettingsStateType | undefined
      >,
    },
    preloadedState,
  });
}

export type AppStoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStoreType["getState"]>;
export type AppDispatch = AppStoreType["dispatch"];