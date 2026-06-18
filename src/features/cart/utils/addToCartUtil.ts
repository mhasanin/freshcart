"use client";

import { toast } from "react-toastify";
import {
  addProductToCart,
  getLoggedUserCart,
  removeProductFromCart,
} from "../server/cart.actions";

export async function addToCartUtil(productId: string) {
  try {
    const result = await addProductToCart({
      productId,
    });
    if (result?.status === "success" && result.message) {
      toast.success(result.message);
    }

    // After adding product to cart the backend may return a partial/unstable
    // payload. Fetch the authoritative cart state and return that to ensure
    // the client store is updated with the same shape as on a full page
    // refresh (server-side cart fetch).
    try {
      const freshCart = await getLoggedUserCart();
      return freshCart;
    } catch (e) {
      // If fetching fresh cart fails, still return the original add result
      // so callers can handle optimistic updates.
      return result;
    }
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Failed to add product to cart",
    );

    throw error;
  }
}
