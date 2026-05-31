import React from "react";
import { FaStar, FaTruck, FaLock } from "react-icons/fa";
import Image from "next/image";
import reviewimage from "@/assets/images/review-author.png";

export default function SignupHero() {
  return (
    <section className="max-w-xl w-full bg-white p-6 md:p-8 rounded-lg border border-emerald-100 shadow-sm">
      <header>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
          Welcome to <span className="text-emerald-500">FreshCart</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-600">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorstep.
        </p>
      </header>

      <ul className="mt-6 space-y-4">
        <li className="flex items-start gap-4">
          <div className="flex-none w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <FaStar />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Premium Quality
            </h4>
            <p className="text-sm text-slate-500">
              Premium quality products sourced from trusted suppliers.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="flex-none w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <FaTruck />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Fast Delivery
            </h4>
            <p className="text-sm text-slate-500">
              Same-day delivery available in most areas
            </p>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="flex-none w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <FaLock />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Secure Shopping
            </h4>
            <p className="text-sm text-slate-500">
              Your data and payments are completely secure
            </p>
          </div>
        </li>
      </ul>

      <aside className="mt-6 p-4 bg-white border border-slate-100 rounded-md shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src={reviewimage}
            alt="Sarah Johnson"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-medium text-slate-900">
              Sarah Johnson
            </div>
            <div className="flex items-center gap-1 mt-1 text-amber-400">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </div>
          </div>
        </div>

        <blockquote className="mt-3 text-sm text-slate-600 italic">
          “FreshCart has transformed my shopping experience. The quality of the
          products is outstanding, and the delivery is always on time. Highly
          recommend!”
        </blockquote>
      </aside>
    </section>
  );
}
