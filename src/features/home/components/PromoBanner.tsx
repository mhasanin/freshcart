import React from "react";
import { FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export default function PromoBanners() {
  const features: FeatureItem[] = [
    {
      title: "Free Shipping",
      description: "On orders over 500 EGP",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      icon: <FaTruck className="w-5 h-5" />,
    },
    {
      title: "Secure Payment",
      description: "100% secure transactions",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      icon: <FaShieldAlt className="w-5 h-5" />,
    },
    {
      title: "Easy Returns",
      description: "14-day return policy",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      icon: <FaUndo className="w-5 h-5" />,
    },
    {
      title: "24/7 Support",
      description: "Dedicated support team",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md hover:border-gray-200 "
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${feature.bgColor} ${feature.color}`}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 leading-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
