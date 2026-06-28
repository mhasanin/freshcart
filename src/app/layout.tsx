import { ReactNode } from "react";
import "../styles/globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { Exo } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import Providers from "@/components/providers/providers";
import { varifyToken } from "@/features/auth/server/auth.actions";
import type { CartStateType } from "@/features/cart/store/cart.slice";
import { getLoggedUserCart } from "@/features/cart/server/cart.actions";
import { getAddressesAction } from "@/features/profile/addresses/server/addresses.actions";
import type { AddressesStateType } from "@/features/profile/addresses/store/addresses.slice";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-exo",
});

let defaultCartState: CartStateType = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};

let defaultAddressesState: AddressesStateType = {
  items: [],
  isLoading: false,
  error: null,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tokenVarificationResult = await varifyToken();
  let cartState = defaultCartState;
  let addressesState = defaultAddressesState;

  if (tokenVarificationResult.isAuthenticated) {
    try {
      const cartData = await getLoggedUserCart();
      cartState = {
        numOfCartItems: cartData.numOfCartItems,
        cartId: cartData.cartId,
        products: cartData.data.products,
        totalCartPrice: cartData.data.totalCartPrice,
        isLoading: false,
        error: null,
      };
    } catch (error) {
      console.error("Error fetching cart in Layout:", error);
      cartState = defaultCartState;
    }

    try {
      const addressesData = await getAddressesAction();
      if (addressesData.success && addressesData.data) {
        addressesState = {
          items: addressesData.data,
          isLoading: false,
          error: null,
        };
      } else {
        addressesState = {
          items: [],
          isLoading: false,
          error: addressesData.message || "Failed to load addresses",
        };
      }
    } catch (error) {
      console.error("Error fetching addresses in Layout:", error);
      addressesState = {
        items: [],
        isLoading: false,
        error: "Something went wrong while fetching addresses.",
      };
    }
  }

  const preloadedState = {
    auth: tokenVarificationResult,
    cart: cartState,
    addresses: addressesState,
  };

  return (
    <html lang="en">
      <body
        className={`${exo.className} font-medium bg-zinc-50 font-sans dark:bg-black`}
        id={exo.className}
      >
        <Providers preloadedState={preloadedState}>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}