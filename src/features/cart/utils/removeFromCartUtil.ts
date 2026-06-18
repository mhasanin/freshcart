"use client";

import { toast } from "react-toastify";
import {
  updateProductQuantity,
  removeProductFromCart,
} from "../server/cart.actions";

export async function removeFromCartUtil(productId: string) {
  try {
    const result = await removeProductFromCart({
      productId,
    });

    if (result?.status === "success" && result.message) {
      toast.success(result.message);
    }

    return result;
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to remove product from cart",
    );
    throw error;
  }
}
