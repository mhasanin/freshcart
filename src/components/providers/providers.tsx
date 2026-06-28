"use client";
import { Provider } from "react-redux";
import { ReactNode, useRef } from "react";
import { Slide, ToastContainer } from "react-toastify";
import {
  createStore,
  type PreloadedStateType,
  type AppStoreType,
} from "@/store/store";

type ProvidersProps = {
  children: ReactNode;
  preloadedState: PreloadedStateType;
};

export default function Providers({
  children,
  preloadedState,
}: ProvidersProps) {
  console.log("[HYDRATION] Providers rendering - React is interactive on client");
  const storeRef = useRef<AppStoreType | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore(preloadedState);
  } else {
    try {
      const currentState = storeRef.current.getState();
      const incoming = JSON.stringify(preloadedState || {});
      const existing = JSON.stringify(currentState || {});
      if (incoming !== existing) {
        storeRef.current = createStore(preloadedState);
      } else {
      }
    } catch (e) {}
  }
  return (
    <>
      <Provider store={storeRef.current}>
        {children}
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
      </Provider>
    </>
  );
}
