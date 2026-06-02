"use client";
import { Provider } from "react-redux";
import { ReactNode, use, useRef } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { AppStoreType, createStore, PreloadedStateType } from "@/store/store";

type ProvidersProps = {
  children: ReactNode;
  preloadedState: PreloadedStateType;
};

export default function Providers({
  children,
  preloadedState,
}: ProvidersProps) {
  const storeRef = useRef<AppStoreType | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore(preloadedState);
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
