import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/freshcart-logo.svg"; // استيراد الصورة من المسار الصحيح
import { CreditCard } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    shop: [
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
    ],

    account: [
      { label: "My Account", href: "/profile" },
      { label: "Order History", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
    ],

    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about" },
    ],

    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { Icon: FaFacebookF, href: "https://facebook.com" },
    { Icon: FaTwitter, href: "https://twitter.com" },
    { Icon: FaInstagram, href: "https://instagram.com" },
    { Icon: FaYoutube, href: "https://youtube.com" },
  ];

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1 */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <div className="bg-white  rounded-2xl p-4  shadow-sm">
                <Image
                  src={logo}
                  alt="FreshCart"
                  width={200}
                  height={100}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:+18001234567"
                className="group flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <FaPhoneAlt className="w-4 h-4 text-emerald-500" />

                <span>+1 (800) 123-4567</span>
              </a>

              <a
                href="mailto:support@freshcart.com"
                className="group flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <FaEnvelope className="w-4 h-4 text-emerald-500" />

                <span>support@freshcart.com</span>
              </a>

              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="w-4 h-4 text-emerald-500 mt-0.5" />

                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300"
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5 capitalize">{title}</h3>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 FreshCart. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {["Visa", "Mastercard", "PayPal"].map((pay) => (
                <div
                  key={pay}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <CreditCard className="w-4 h-4" />

                  <span>{pay}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
