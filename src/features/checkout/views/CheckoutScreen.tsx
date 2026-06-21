"use client";

import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  shippingAddressSchema,
  shippingAddressType,
} from "../schemas/checkout.schema";
import CheckoutBreadcrumbs from "../components/CheckoutBreadcrumbs";
import ShippingAddressSection from "../components/ShippingAddressSection";
import PaymentMethodSection from "../components/PaymentMethodSection";
import OrderSummarySection from "../components/OrderSummarySection";
import { ArrowLeft, ReceiptText } from "lucide-react";
import Link from "next/link";
import { createCashOrder, createOnlineOrder } from "../server/checkout.actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/features/cart/store/cart.slice";

export type PaymentMethodType = "cod" | "online";

export default function CheckoutScreen() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");
  const { cartId } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const methods = useForm({
    defaultValues: {
      city: "",
      details: "",
      phone: "",
    },
    resolver: zodResolver(shippingAddressSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<shippingAddressType> = async (data) => {
    try {
      if (!cartId) return;

      if (paymentMethod === "cod") {
        const res = await createCashOrder({ cartId, shippingAddress: data });
        if (res?.status === "success") {
          dispatch(clearCart());
          toast.success("Order placed successfully!");
          methods.reset();
          setTimeout(() => {
            router.push("/allorders");
          }, 2000);
        }
      } else if (paymentMethod === "online") {
        const originUrl = window.location.origin;

        const res = await createOnlineOrder({
          cartId,
          shippingAddress: data,
          originUrl,
        });

        if (res?.status === "success" && res.session?.url) {
          if (res?.status === "success") {
            dispatch(clearCart());

            toast.loading("Redirecting to payment gateway...");
            methods.reset();
            setTimeout(() => {
              location.href = res.session.url;
            }, 2000);
          }
        }
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <CheckoutBreadcrumbs />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 w-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="bg-linear-to-br from-emerald-600 to-emerald-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <ReceiptText className="w-6 h-6" />
              </span>
              Complete Your Order
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Review your items and complete your purchase
            </p>
          </div>
          <Link
            href="/cart"
            className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <ShippingAddressSection />

                <PaymentMethodSection
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </div>
              <div className="lg:col-span-1">
                <OrderSummarySection paymentMethod={paymentMethod} />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
