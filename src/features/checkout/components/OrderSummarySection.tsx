"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import { useFormContext } from "react-hook-form";
import { ShoppingBag, Truck, ShieldCheck, Box } from "lucide-react";

interface OrderSummarySectionProps {
  paymentMethod: "cod" | "online";
}

export default function OrderSummarySection({
  paymentMethod,
}: OrderSummarySectionProps) {
  const { numOfCartItems, products, totalCartPrice } = useAppSelector(
    (state) => state.cart,
  );

  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const subtotal = totalCartPrice || 0;
  const FREE_SHIPPING_THRESHOLD = 500;
  const FLAT_SHIPPING_COST = 50;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : FLAT_SHIPPING_COST;
  const totalPrice = subtotal + shippingCost;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-24">
      <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Order Summary
        </h2>
        <p className="text-emerald-100 text-sm mt-1">
          {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="p-5">
        {products && products.length > 0 && (
          <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1 custom-scrollbar">
            {products.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                  <img
                    alt={item.product?.title}
                    className="w-full h-full object-contain"
                    src={item.product?.imageCover}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.product?.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.count} × {item.price} EGP
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900 shrink-0">
                  {item.price * item.count}
                </p>
              </div>
            ))}
          </div>
        )}

        <hr className="border-gray-100 my-4" />

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">{subtotal} EGP</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-400" />
              Shipping
            </span>
            {isFreeShipping ? (
              <span className="text-emerald-600 font-semibold uppercase text-xs tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                FREE
              </span>
            ) : (
              <span className="font-medium">{FLAT_SHIPPING_COST} EGP</span>
            )}
          </div>

          <hr className="border-gray-100" />

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-emerald-600">
                {totalPrice}
              </span>
              <span className="text-sm text-gray-500 ml-1">EGP</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid || numOfCartItems === 0}
          className="w-full mt-6 bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
        >
          <Box className="w-4 h-4" />
          {paymentMethod === "cod" ? "Place Order" : "Proceed to Payment"}
        </button>

        <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Truck className="w-4 h-4 text-blue-500" />
            <span>Fast Delivery</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Box className="w-4 h-4 text-orange-500" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
