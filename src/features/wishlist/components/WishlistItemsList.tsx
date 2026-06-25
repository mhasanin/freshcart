"use client";

import React from "react";
import { Heart, Trash2, ShoppingCart, Check } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromWishlistUtil } from "../utils/removeFromWishlistUtil";
import { setWishlistInfo } from "../store/wishlist.slice";
import { addToCartUtil } from "@/features/cart/utils/addToCartUtil";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import type { WishlistItem } from "../types/wishlist.types";

const ReactSwal = withReactContent(Swal);

export default function WishlistItemsList() {
  const dispatch = useAppDispatch();
  const { count, products } = useAppSelector((state) => state.wishlist);
  const cart = useAppSelector((state) => state.cart);
  const [addingIds, setAddingIds] = React.useState<string[]>([]);

  const handleRemoveItem = async (item: WishlistItem) => {
    const productTitle = item.title ?? "this item";

    const result = await ReactSwal.fire({
      title: "Remove Item?",
      text: `Remove ${productTitle} from your wishlist?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await removeFromWishlistUtil(item._id);
      if (response && response.status === "success") {
        dispatch(setWishlistInfo(response));
      }
    } catch (error) {
      await ReactSwal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Failed to remove item",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    // Prevent duplicate adds if item already in cart or currently adding
    const alreadyInCart = cart.products?.some(
      (c) => c.product?._id === item._id,
    );
    if (alreadyInCart) return;
    if (addingIds.includes(item._id)) return;

    setAddingIds((s) => [...s, item._id]);
    try {
      const response = await addToCartUtil(item._id);
      if (response && response.status === "success") {
        dispatch(setCartInfo(response));
      }
    } catch (error) {
      // Handled globally
    } finally {
      setAddingIds((s) => s.filter((id) => id !== item._id));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a className="hover:text-emerald-600 transition" href="/">
              Home
            </a>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/10">
                  <Heart className="w-6 h-6 fill-current" />
                </span>
                My Wishlist
              </h1>
              <p className="text-gray-500 mt-2">
                You have{" "}
                <span className="font-semibold text-emerald-600">
                  {count} {count === 1 ? "item" : "items"}
                </span>{" "}
                saved
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {products.map((item: WishlistItem) => (
            <div
              key={item._id}
              className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
            >
              <div className="p-4 sm:p-5">
                <div className="flex gap-4 sm:gap-6">
                  <a
                    className="relative shrink-0 group"
                    href={`/products/${item._id}`}
                  >
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                      <img
                        alt={item.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        src={item.imageCover}
                      />
                    </div>
                    {(item.quantity ?? 0) > 0 && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Check className="w-2.5 h-2.5" />
                        In Stock
                      </div>
                    )}
                  </a>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <a
                          className="group/title block min-w-0"
                          href={`/products/${item._id}`}
                        >
                          <h3 className="font-semibold text-gray-900 group-hover/title:text-emerald-600 transition-colors leading-relaxed text-base sm:text-lg truncate">
                            {item.title}
                          </h3>
                        </a>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="inline-block px-2.5 py-1 bg-linear-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-medium rounded-full">
                          {item.category?.name ?? ""}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          Brand: {item.brand?.name ?? ""}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-baseline gap-2">
                        <span className="text-emerald-600 font-bold text-xl">
                          {item.price} EGP
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {cart.products?.some(
                          (c) => c.product?._id === item._id,
                        ) ? (
                          <button
                            disabled
                            className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-xl transition-colors shadow-xs cursor-default"
                          >
                            <span>Added to Cart ✓</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 px-4 rounded-xl transition-colors shadow-xs cursor-pointer"
                            disabled={addingIds.includes(item._id)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>
                              {addingIds.includes(item._id)
                                ? "Adding..."
                                : "Add to Cart"}
                            </span>
                          </button>
                        )}

                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="h-9 w-9 cursor-pointer rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
                          title="Remove item"
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 px-2">
          <a
            href="/"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
          >
            ← Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
