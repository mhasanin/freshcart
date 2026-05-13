import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/mini-logo.png";
import {
  ChevronDown,
  Heart,
  Headset,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  Truck,
  Gift,
  User,
  UserPlus,
  Menu,
} from "lucide-react";

export default function NavBar() {
  return (
    <header className="bg-white">
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden lg:block text-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Free Shipping on Orders 500 EGP</span>
              </span>
              <span className="flex items-center gap-2">
                <Gift className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>New Arrivals Daily</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500 font-exo font-medium">
                <a
                  href="tel:+18001234567"
                  className="group flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                >
                  <Phone
                    className="w-3.5 h-3.5 fill-gray-500 text-gray-500 transition-colors 
               group-hover:fill-emerald-600 group-hover:text-emerald-600"
                  />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="group flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@freshcart.com</span>
                </a>
              </div>

              <span className="w-px h-4 bg-gray-200"></span>

              <div className="flex items-center gap-4 font-exo">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signup"
                  className="group flex items-center gap-1.5 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  {/* 1. ايكونة سوليد ساين اب */}
                  <UserPlus className="w-3.5 h-3.5 fill-gray-600 text-gray-600 group-hover:fill-emerald-600 group-hover:text-emerald-600" />
                  <span>Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
            <Link href="/" className="shrink-0 flex items-center gap-2">
              <Image
                src={logo}
                alt="FreshCart"
                className="h-8 w-auto object-contain"
                priority
              />
              <span className="text-[#1a2c3d] text-4xl font-bold tracking-tight">
                FreshCart
              </span>
            </Link>

            {/* Search Bar */}
            <form className="hidden lg:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-5 py-2.5 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Search className="w-4 h-4 stroke-[3px]" />
                </button>
              </div>
            </form>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6 font-exo">
              <Link
                href="/"
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors"
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors"
              >
                Shop
              </Link>

              <div className="relative group">
                <button className="flex items-center gap-1.5 text-gray-700 hover:text-emerald-600 font-semibold transition-colors py-2">
                  Categories
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-50 overflow-hidden">
                    <Link
                      className="block px-4 py-2 text-gray-600 hover:text-white hover:bg-emerald-600"
                      href="/categories"
                    >
                      All Categories
                    </Link>
                    <Link
                      className="block px-4 py-2 text-gray-600 hover:text-white hover:bg-emerald-600"
                      href="/products?category=electronics"
                    >
                      Electronics
                    </Link>
                    <Link
                      className="block px-4 py-2 text-gray-600 hover:text-white hover:bg-emerald-600"
                      href="/products?category=women"
                    >
                      Women's Fashion
                    </Link>
                    <Link
                      className="block px-4 py-2 text-gray-600 hover:text-white hover:bg-emerald-600"
                      href="/products?category=men"
                    >
                      Men's Fashion
                    </Link>
                    <Link
                      className="block px-4 py-2 text-gray-600 hover:text-white hover:bg-emerald-600"
                      href="/products?category=beauty"
                    >
                      Beauty & Health
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/brands"
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors"
              >
                Brands
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden lg:flex items-center gap-2 pr-3 mr-1 border-r border-gray-200 hover:text-emerald-600 group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100">
                  <Headset className="text-emerald-600 w-5 h-5 fill-emerald-600/10" />
                </div>
                <div className="text-xs">
                  <div className="text-gray-400">Support</div>
                  <div className="font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
                    24/7 Help
                  </div>
                </div>
              </Link>

              <Link
                href="/wishlist"
                className="p-2 rounded-full hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 transition-all"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 transition-all"
              >
                <ShoppingCart className="w-5 h-5 fill-gray-500/10" />
              </Link>

              <Link
                href="/login"
                className="hidden lg:flex items-center gap-2 ml-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-bold transition-all shadow-md shadow-emerald-200 active:scale-95"
              >
                <User className="w-4 h-4 fill-white text-white" />
                Sign In
              </Link>

              <button className="lg:hidden w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
