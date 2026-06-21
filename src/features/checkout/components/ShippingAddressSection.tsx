"use client";

import { Building2, MapPin, Phone } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function ShippingAddressSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Shipping Address
        </h2>
        <p className="text-emerald-100 text-sm mt-1">
          Where should we deliver your order?
        </p>
      </div>

      <div className="p-6 space-y-5">
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-800 font-medium">
              Delivery Information
            </p>
            <p className="text-xs text-blue-600 mt-0.5">
              Please ensure your address is accurate for smooth delivery
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400 pointer-events-none">
              <Building2 className="w-5 h-5 text-gray-500" />
            </div>

            <input
              id="city"
              {...register("city")}
              className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="e.g. Cairo, Alexandria, Giza"
              type="text"
            />
          </div>
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.city.message)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="details"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Street Address <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-start">
            <div className="absolute left-4 top-4 text-gray-400 pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-500" />
            </div>

            <textarea
              id="details"
              rows={3}
              {...register("details")}
              className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all resize-none border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="Street name, building number, floor, apartment..."
            />
          </div>
          {errors.details && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.details.message)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400 pointer-events-none">
              <Phone className="w-5 h-5 text-gray-500" />
            </div>

            <input
              id="phone"
              {...register("phone")}
              className="w-full pl-12 pr-36 py-3.5 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-gray-900"
              placeholder="01xxxxxxxxx"
              type="tel"
            />

            <div className="absolute right-4 text-xs text-gray-400 pointer-events-none select-none">
              Egyptian numbers only
            </div>
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.phone.message)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
