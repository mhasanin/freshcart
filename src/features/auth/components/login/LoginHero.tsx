import React from "react";
import { FaTruck, FaShieldAlt, FaClock } from "react-icons/fa";

export default function LoginHero() {
  return (
    <div className="hidden lg:flex flex-col items-center text-center space-y-8">
      <img
        className="w-full max-w-xl h-auto object-cover rounded-3xl shadow-2xl shadow-emerald-50"
        alt="fresh groceries"
        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png"
      />
      <div className="space-y-4">
        <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
          Fresh Groceries <br />
          <span className="text-emerald-600">Delivered To You</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-sm mx-auto">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>

        <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FaTruck size={14} />
            </div>
            Free Delivery
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FaShieldAlt size={14} />
            </div>
            Secure Payment
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FaClock size={14} />
            </div>
            24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
}
