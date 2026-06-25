"use client";

import { toast } from "react-toastify";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
} from "../server/wishlist.actions";

export async function addToWishlistUtil(productId: string) {
  try {
    const result = await addProductToWishlist({
      productId,
    });
    if (result?.status === "success" && result.message) {
      toast.success(result.message);
    }

    try {
      const freshWishlist = await getLoggedUserWishlist();
      return freshWishlist;
    } catch (e) {
      return null;
    }
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to add product to wishlist",
    );
    throw error;
  }
}
