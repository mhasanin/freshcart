"use client";

import { CreditCard, ShieldCheck } from "lucide-react";
import { PaymentMethodType } from "../views/CheckoutScreen";

interface PaymentMethodSectionProps {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
}

export default function PaymentMethodSection({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Method
        </h2>
        <p className="text-emerald-100 text-sm mt-1">
          Choose how you'd like to pay
        </p>
      </div>

      <div className="p-6 space-y-4">
        <button
          type="button"
          onClick={() => setPaymentMethod("cod")}
          className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 text-left ${
            paymentMethod === "cod"
              ? "border-emerald-500 bg-linear-to-r from-emerald-50 to-emerald-50/10 shadow-sm"
              : "border-gray-200 hover:border-emerald-200 hover:bg-gray-50"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
              paymentMethod === "cod"
                ? "bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3
              className={`font-bold ${paymentMethod === "cod" ? "text-emerald-700" : "text-gray-900"}`}
            >
              Cash on Delivery
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Pay when your order arrives at your doorstep
            </p>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              paymentMethod === "cod"
                ? "bg-emerald-600 text-white"
                : "border-2 border-gray-200"
            }`}
          >
            {paymentMethod === "cod" && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod("online")}
          className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 text-left ${
            paymentMethod === "online"
              ? "border-emerald-500 bg-linear-to-r from-emerald-50 to-emerald-50/10 shadow-sm"
              : "border-gray-200 hover:border-emerald-200 hover:bg-gray-50"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
              paymentMethod === "online"
                ? "bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3
              className={`font-bold ${paymentMethod === "online" ? "text-emerald-700" : "text-gray-900"}`}
            >
              Pay Online
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Secure payment with Credit/Debit Card via Stripe
            </p>
            <div className="flex items-center gap-2 mt-2">
              <img
                alt="Visa"
                className="h-5"
                src="https://img.icons8.com/color/48/visa.png"
              />
              <img
                alt="Mastercard"
                className="h-5"
                src="https://img.icons8.com/color/48/mastercard.png"
              />
              <img
                alt="Amex"
                className="h-5"
                src="https://img.icons8.com/color/48/amex.png"
              />
            </div>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              paymentMethod === "online"
                ? "bg-emerald-600 text-white"
                : "border-2 border-gray-200"
            }`}
          >
            {paymentMethod === "online" && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </button>

        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">
              Secure & Encrypted
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              Your payment info is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
