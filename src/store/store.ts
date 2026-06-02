import { authReducer, AuthStateType } from "@/features/auth/store/auth.slice";
import { configureStore } from "@reduxjs/toolkit";

export type PreloadedStateType = {
  auth: AuthStateType;
};

export function createStore(preloadedState: PreloadedStateType) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });
  return store;
}

export type AppStoreType = ReturnType<typeof createStore>;
export type RootStateType = ReturnType<AppStoreType["getState"]>;
