"use client";

import {
  ShoppingCart,
  Check,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCartUtil } from "@/features/cart/utils/removeFromCartUtil";
import { updateCartQuantityUtil } from "@/features/cart/utils/updateCartQuantityUtil";
import type { CartItem } from "@/features/cart/types/cart.typs";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import Link from "next/link";
const ReactSwal = withReactContent(Swal);

export default function CartItemsList() {
  const dispatch = useAppDispatch();
  const { numOfCartItems, products, totalCartPrice } = useAppSelector(
    (state) => state.cart,
  );

  const subtotal = totalCartPrice;
  const FREE_SHIPPING_THRESHOLD = 500;
  const FLAT_SHIPPING_COST = 50;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingCost = isFreeShipping ? 0 : FLAT_SHIPPING_COST;
  const totalPrice = subtotal + shippingCost;

  const progressPercentage = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  const handleRemoveItem = async (item: CartItem) => {
    const productTitle = item.product?.title ?? "this item";

    const result = await ReactSwal.fire({
      title: "Remove Item?",
      text: `Remove ${productTitle} from your cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    const productIdToDelete = item.product._id;

    try {
      const response = await removeFromCartUtil(productIdToDelete);
      if (response?.status === "success") {
        dispatch(setCartInfo(response));
      }
    } catch (error) {
      await ReactSwal.fire({
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to remove item from cart",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const handleUpdate = async (item: CartItem, newCount: number) => {
    if (newCount < 1) return;

    const productIdToUpdate = item.product._id;

    try {
      const response = await updateCartQuantityUtil(
        productIdToUpdate,
        newCount,
      );
      if (response?.status === "success") {
        dispatch(setCartInfo(response));
      }
    } catch (error) {
      await ReactSwal.fire({
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to update item quantity",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a className="hover:text-emerald-600 transition" href="/">
              Home
            </a>

            <span>/</span>

            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/10">
                  <ShoppingCart className="w-6 h-6" />
                </span>
                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-2">
                You have{" "}
                <span className="font-semibold text-emerald-600">
                  {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-4">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex gap-4 sm:gap-6">
                      <a
                        className="relative shrink-0 group"
                        href={`/products/${item.product._id}`}
                      >
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                          <img
                            alt={item.product.title}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            src={item.product.imageCover}
                          />
                        </div>

                        {(item.product.quantity ?? 0) > 0 && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            <Check className="w-2.5 h-2.5" />
                            In Stock
                          </div>
                        )}
                      </a>

                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="mb-3">
                          <a
                            className="group/title"
                            href={`/products/${item.product._id}`}
                          >
                            <h3 className="font-semibold text-gray-900 group-hover/title:text-emerald-600 transition-colors leading-relaxed text-base sm:text-lg truncate">
                              {item.product.title}
                            </h3>
                          </a>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block px-2.5 py-1 bg-linear-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-medium rounded-full">
                              {item.product.category?.name ?? ""}
                            </span>

                            <span className="text-xs text-gray-400">•</span>

                            <span className="text-xs text-gray-500">
                              SKU: {item.product._id.slice(-6).toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-emerald-600 font-bold text-lg">
                              {item.price} EGP
                            </span>

                            <span className="text-xs text-gray-400">
                              per unit
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center">
                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                              <button
                                className="h-8 w-8 rounded-lg cursor-pointer bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  handleUpdate(item, item.count - 1)
                                }
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>

                              <span className="w-12 text-center font-bold text-gray-900 ">
                                {item.count}
                              </span>

                              <button
                                className="h-8 w-8 rounded-lg cursor-pointer bg-emerald-600 shadow-sm shadow-emerald-600/30 flex items-center justify-center text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                aria-label="Increase quantity"
                                onClick={() =>
                                  handleUpdate(item, item.count + 1)
                                }
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-0.5">
                                Total
                              </p>

                              <p className="text-xl font-bold text-gray-900">
                                {item.price * item.count}{" "}
                                <span className="text-sm font-medium text-gray-400">
                                  EGP
                                </span>
                              </p>
                            </div>

                            <button
                              className="h-10 w-10 cursor-pointer rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200"
                              title="Remove item"
                              type="button"
                              onClick={() => handleRemoveItem(item)}
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

            <div className="flex items-center justify-between pt-4 px-2">
              <a
                href="/"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                ← Continue Shopping
              </a>

              <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 cursor-pointer transition-colors duration-200">
                <Trash2 className="w-4 h-4" />

                <span>Clear all items</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <div className="bg-emerald-600 -mx-6 -mt-6 p-4 rounded-t-2xl mb-6 text-white flex items-center justify-between">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  Order Summary
                </h2>

                <span className="text-xs bg-emerald-700/50 px-2.5 py-1 rounded-full font-medium">
                  {numOfCartItems} items in cart
                </span>
              </div>

              {isFreeShipping ? (
                <div className="bg-emerald-50/50 rounded-xl p-4 mb-6 border border-emerald-100/50 flex items-start gap-3">
                  <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      Free Shipping!
                    </p>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      You qualify for free delivery on this order.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4 mb-6 border border-orange-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-orange-500 shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      Add {remainingForFreeShipping} EGP for free shipping
                    </span>
                  </div>
                  <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>

                  <span className="font-semibold text-gray-900">
                    {subtotal} EGP
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      {subtotal} EGP
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span>

                    {isFreeShipping ? (
                      <span className="font-semibold text-green-600 uppercase text-xs tracking-wider bg-green-50 px-2 py-0.5 rounded-md">
                        Free
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-900">
                        {shippingCost} EGP
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-px bg-gray-100 my-2"></div>

                <div className="flex justify-between items-baseline">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>

                  <span className="text-2xl font-black text-emerald-600">
                    {totalPrice} EGP
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <button className="w-full py-2.5 px-4 text-sm font-medium cursor-pointer text-gray-500 hover:text-emerald-600 border border-gray-200 hover:border-emerald-200 rounded-xl hover:bg-emerald-50/30 transition-colors duration-200 flex items-center justify-center gap-2">
                  Apply Promo Code
                </button>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-700/30 transition-all duration-200 mb-4 flex items-center justify-center gap-2"
              >
                Secure Checkout
              </Link>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />

                  <span>Secure Payment</span>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Truck className="w-4 h-4 text-emerald-600" />

                  <span>Fast Delivery</span>
                </div>
              </div>

              <a
                href="/"
                className="block text-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors mt-6"
              >
                ← Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
