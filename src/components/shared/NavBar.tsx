"use client";

import logo from "@/assets/images/mini-logo.png";
import {
  ChevronDown,
  Gift,
  Headset,
  Heart,
  LogOut,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Truck,
  User,
  UserPlus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/store";
import useLogout from "@/features/auth/hooks/useLogout";
import { useState } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useLogout();
  const { isAuthenticated, userInfo } = useSelector(
    (appState: RootStateType) => appState.auth,
  );
  const { numOfCartItems } = useSelector(
    (appState: RootStateType) => appState.cart,
  );

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
                  <Phone className="w-3.5 h-3.5 fill-gray-500 text-gray-500 transition-colors group-hover:fill-emerald-600 group-hover:text-emerald-600" />
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

              {/* Top Bar Auth Links */}
              <div className="flex items-center gap-4 font-exo">
                {isAuthenticated ? (
                  <>
                    {/* Logged In State */}
                    <div className="flex items-center gap-4">
                      <Link
  href="/profile"
  className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gray-50/60 hover:bg-emerald-50/40 text-sm font-exo transition-all duration-300 border border-gray-100/70 hover:border-emerald-100/60"
>
  <div className="relative flex items-center justify-center w-5.5 h-5.5 rounded-lg bg-white group-hover:bg-emerald-600 text-gray-500 group-hover:text-white transition-all duration-300 shadow-xs border border-gray-100 group-hover:border-emerald-600">
    <User className="w-3 h-3 fill-current opacity-90 group-hover:scale-110 transition-transform" />
  </div>

  <div className="flex items-center gap-1 font-semibold">
    <span className="text-gray-400 font-medium">Hi,</span>
    <span className="text-gray-800 group-hover:text-emerald-700 max-w-27.5 truncate relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-emerald-600 group-hover:after:w-full after:transition-all after:duration-300 pb-0.5">
      {userInfo?.name ? userInfo.name.split(" ")[0] : "Guest"}
    </span>
  </div>
</Link>

                      <button
                        onClick={logout}
                        className="group flex items-center gap-1.5 text-gray-600 hover:text-red-500 font-medium transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 transition-colors group-hover:text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Logged Out State */}
                    <div className="flex items-center gap-4">
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
                        <UserPlus className="w-3.5 h-3.5 fill-gray-600 text-gray-600 group-hover:fill-emerald-600 group-hover:text-emerald-600" />
                        <span>Sign Up</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
            <Link href="/" className="flex items-center gap-2 min-w-fit">
              <Image
                src={logo}
                alt="FreshCart"
                width={40}
                height={32}
                className="w-10 h-8"
                style={{ width: "40px", height: "32px" }}
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
                className="relative p-2 rounded-full hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 transition-all"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 transition-all"
              >
                <ShoppingCart className="w-5 h-5 fill-gray-500/10" />
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  {numOfCartItems}
                </span>
              </Link>

              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="p-2 rounded-full hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 transition-all"
                >
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden lg:flex items-center gap-2 ml-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-bold transition-all shadow-md shadow-emerald-200 active:scale-95"
                >
                  <User className="w-4 h-4 fill-white text-white" />
                  Sign In
                </Link>
              )}

              {/* Mobile view menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center transition-all active:scale-95"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="relative ml-auto w-72 h-full bg-white shadow-xl p-5 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Menu Header with Logo/Title */}
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={logo}
                    alt="FreshCart"
                    width={32}
                    height={26}
                    style={{ width: "32px", height: "26px" }}
                  />
                  <span className="text-[#1a2c3d] text-2xl font-bold tracking-tight">
                    FreshCart
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Bar Component */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all text-sm"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Main Navigation Links */}
              <nav className="flex flex-col gap-1 font-exo text-[15px]">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 px-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg font-semibold transition-all"
                >
                  Home
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 px-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg font-semibold transition-all"
                >
                  Shop
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 px-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg font-semibold transition-all"
                >
                  Categories
                </Link>
                <Link
                  href="/brands"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 px-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg font-semibold transition-all"
                >
                  Brands
                </Link>

                <hr className="border-gray-100 my-3" />

                {/* Added Missing Wishlist and Cart items for Mobile layout */}
                <Link
                  href="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg font-semibold transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <Heart className="w-4 h-4 fill-red-500/10" />
                  </div>
                  <span>Wishlist</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg font-semibold transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <ShoppingCart className="w-4 h-4 fill-emerald-600/10" />
                    </div>
                    <span>Cart</span>
                  </div>
                  <span className="bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </Link>
              </nav>
            </div>

            {/* Bottom Section: Support and Auth buttons */}
            <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-gray-100">
              {/* Added Contact Support Section */}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50/40 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Headset className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="text-gray-400 font-medium">Need Help?</div>
                  <div className="font-bold text-emerald-600">
                    Contact Support
                  </div>
                </div>
              </Link>

              {/* Authentication Actions */}
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2.5 px-3 text-gray-700 hover:text-emerald-600 font-semibold"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 py-2.5 px-3 text-left text-gray-600 hover:text-red-500 font-semibold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 font-exo">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center w-full h-11 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all active:scale-98 shadow-md shadow-emerald-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center w-full h-11 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold text-sm hover:bg-emerald-50 transition-all active:scale-98"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
