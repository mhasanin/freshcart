"use client";

import { toast } from "react-toastify";
import { updateProductQuantity } from "../server/cart.actions";

export async function updateCartQuantityUtil(
  productId: string,
  newCount: number,
) {
  try {
    const result = await updateProductQuantity({
      productId,
      quantity: newCount,
    });

    if (result?.status === "success" && result.message) {
      toast.success(result.message);
    }

    return result;
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to update product quantity",
    );
    throw error;
  }
}
