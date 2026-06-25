"use client";

import { toast } from "react-toastify";
import {
  removeProductFromWishlist,
  getLoggedUserWishlist,
} from "../server/wishlist.actions";

export async function removeFromWishlistUtil(productId: string) {
  try {
    const result = await removeProductFromWishlist({
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
        : "Failed to remove product from wishlist",
    );
    throw error;
  }
}
