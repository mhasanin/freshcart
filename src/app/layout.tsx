import { ReactNode } from "react";
import "../styles/globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { Exo } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import Providers from "@/components/providers/providers";
import { varifyToken } from "@/features/auth/server/auth.actions";
import type { CartStateType } from "@/features/cart/store/cart.slice";
import { fa, tr } from "zod/v4/locales";
import { getLoggedUserCart } from "@/features/cart/server/cart.actions";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-exo",
});
let defaltCartState: CartStateType = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tokenVarificationResult = await varifyToken();
  let cartState = defaltCartState;
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
      cartState = defaltCartState;
    }
  }

  // Initialize cart with default state

  const preloadedState = {
    auth: tokenVarificationResult,
    cart: cartState,
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
