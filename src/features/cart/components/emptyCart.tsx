import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function EmptyCart() {
  const popularCategories = [
    { name: "Electronics", href: "/categories" },
    { name: "Fashion", href: "/categories" },
    { name: "Home", href: "/categories" },
    { name: "Beauty", href: "/categories" },
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag
              className="w-16 h-16 text-gray-300"
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like you haven't added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] group"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCategories.map((category, index) => (
              <a
                key={index}
                href={category.href}
                className="px-4 py-2 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-gray-600 rounded-full text-sm font-medium transition-colors duration-200"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
