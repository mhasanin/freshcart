"use client";

import { toast } from "react-toastify";
import { addProductToCart, getLoggedUserCart } from "../server/cart.actions";

export async function addToCartUtil(productId: string) {
  try {
    const result = await addProductToCart({
      productId,
    });
    if (result?.status === "success" && result.message) {
      toast.success(result.message);
    }

    try {
      const freshCart = await getLoggedUserCart();
      return freshCart;
    } catch (e) {
      return result;
    }
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Failed to add product to cart",
    );

    throw error;
  }
}
