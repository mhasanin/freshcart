"use client";

import { useState } from "react";
import { Order } from "../types/orders.types";
import {
  Check,
  Truck,
  Clock,
  CreditCard,
  Banknote,
  Calendar,
  Package,
  MapPin,
  Phone,
  FileText,
  ChevronDown,
} from "lucide-react";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const MAX_DISPLAY_ITEMS = 3;
  const displayItems = order.cartItems.slice(0, MAX_DISPLAY_ITEMS);
  const totalItemTypes = order.cartItems.length;
  const remainingTypesCount = totalItemTypes - displayItems.length;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getStatusBadge = () => {
    if (order.isDelivered) {
      return {
        bg: "bg-green-50",
        text: "text-green-700 border-green-100",
        label: "Delivered",
        icon: <Check className="w-3.5 h-3.5 stroke-[2.5]" />,
      };
    } else if (order.isPaid) {
      return {
        bg: "bg-blue-50",
        text: "text-blue-700 border-blue-100",
        label: "On the way",
        icon: <Truck className="w-3.5 h-3.5" />,
      };
    } else {
      return {
        bg: "bg-amber-50",
        text: "text-amber-700 border-amber-100",
        label: "Processing",
        icon: <Clock className="w-3.5 h-3.5" />,
      };
    }
  };

  const status = getStatusBadge();

  return (
    <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start mx-auto sm:mx-0">
            {displayItems.map((item) => (
              <div
                key={item._id}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-1.5 flex items-center justify-center overflow-hidden shrink-0"
              >
                {item.product?.imageCover && (
                  <img
                    alt={item.product.title}
                    className="w-full h-full object-contain"
                    src={item.product.imageCover}
                  />
                )}
                {item.count > 1 && (
                  <div className="absolute bottom-1 left-1 bg-gray-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    x{item.count}
                  </div>
                )}
              </div>
            ))}

            {!isOpen && remainingTypesCount > 0 && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <span className="text-gray-600 font-bold text-sm sm:text-base">
                  +{remainingTypesCount}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${status.bg} border ${status.text} rounded-full mb-2`}
                >
                  {status.icon}
                  <span className="text-xs font-semibold">{status.label}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-1.5">
                  <span className="text-sm font-medium text-gray-400">#</span>
                  {order.id}
                </h3>
              </div>
              <div
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  order.paymentMethodType === "card"
                    ? "bg-purple-50 border border-purple-100 text-purple-600"
                    : "bg-gray-50 border border-gray-100 text-gray-600"
                }`}
              >
                {order.paymentMethodType === "card" ? (
                  <CreditCard className="w-5 h-5" />
                ) : (
                  <Banknote className="w-5 h-5" />
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                {formattedDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-gray-400" />
                {totalItemTypes}{" "}
                {totalItemTypes === 1 ? "item type" : "item types"}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{order.shippingAddress?.city || "N/A"}</span>
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-50 sm:border-0 sm:pt-0">
              <div>
                <span className="text-xl sm:text-2xl font-black text-gray-950">
                  {order.totalOrderPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-gray-400 ml-1.5">
                  EGP
                </span>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isOpen
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isOpen ? "Hide" : "Details"}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-6 animate-fadeIn">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Package className="w-4 h-4" />
                Order Items
              </div>
              <div className="divide-y divide-gray-100 border border-gray-150 rounded-xl overflow-hidden bg-gray-50/10">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition duration-150"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg border border-gray-100 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                          src={item.product.imageCover}
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate max-w-50 sm:max-w-100">
                          {item.product.title}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">
                          {item.count} × {item.price.toLocaleString()} EGP
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-950 shrink-0 ml-3">
                      {(item.count * item.price).toLocaleString()}{" "}
                      <span className="text-xxs font-medium text-gray-400">
                        EGP
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/40 flex flex-col justify-between transition-all hover:border-blue-200 hover:shadow-sm">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">
                      Delivery Address
                    </h4>
                  </div>

                  <div className="space-y-1.5 pl-13">
                    <p className="font-bold text-gray-900 text-sm">
                      {order.shippingAddress?.city || "N/A"}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {order.shippingAddress?.details || "No details provided"}
                    </p>
                  </div>
                </div>

                {order.shippingAddress?.phone && (
                  <div className="mt-5 pt-4 border-t border-blue-200/50 pl-13">
                    <p className="text-blue-700 flex items-center gap-2.5 text-sm font-semibold">
                      <Phone className="w-4 h-4 text-blue-500" />
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 rounded-2xl border border-green-100 bg-green-50/40 flex flex-col justify-between transition-all hover:border-green-200 hover:shadow-sm">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center shrink-0 shadow-sm">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">
                      Order Summary
                    </h4>
                  </div>

                  <div className="space-y-3 pl-13 text-sm">
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        {order.totalOrderPrice.toLocaleString()} EGP
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-700 font-bold bg-green-200/50 border border-green-200 px-2 py-0.5 rounded-md text-xs">
                        Free
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 bg-green-100/60 border border-green-200/60 rounded-xl p-3.5 flex justify-between items-center ml-0 sm:ml-13 transition-colors hover:bg-green-100">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <span className="text-lg sm:text-xl text-green-700 font-black tracking-tight">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
