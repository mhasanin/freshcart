"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  Navigation,
  Thumbs,
  FreeMode,
  Keyboard,
  Mousewheel,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useState } from "react";
import Image from "next/image";
import {
  Minus,
  Plus,
  ShoppingCart,
  Bolt,
  Heart,
  Share2,
  RotateCcw,
} from "lucide-react";
import { ProductType } from "../../types/products.types";
import Rating from "@/components/ui/Rating";
import { FaShieldAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { addToCartUtil } from "@/features/cart/utils/addToCartUtil";
import { useAppDispatch } from "@/store/hooks";
import { setCartInfo } from "@/features/cart/store/cart.slice";

export default function ProductDetailsInfo({
  product,
}: {
  product: ProductType;
}) {
  const dispatch = useAppDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const productImages = [product.imageCover, ...(product.images || [])];
  const [quantity, setQuantity] = useState(product.quantity > 0 ? 1 : 0);

  const fullStars = Math.floor(product.ratingsAverage || 0);
  const hasHalfStar = (product.ratingsAverage || 0) % 1 >= 0.5;
  const isInStock = product.quantity > 0;
  const isLowStock = product.quantity > 0 && product.quantity < 10;

  const discountPercentage = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : 0;
  const [isLoading, setIsLoading] = useState(false);
  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const result = await addToCartUtil(product._id);
      if (result?.status === "success") {
        dispatch(setCartInfo(result));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="product-detail" className="py-6 bg-gray-50/50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div id="product-images" className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4 border border-gray-100">
              <Swiper
                modules={[
                  Navigation,
                  Thumbs,
                  FreeMode,
                  Keyboard,
                  Mousewheel,
                  Autoplay,
                ]}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                navigation={productImages.length > 1}
                keyboard={{ enabled: true }}
                mousewheel={{ forceToAxis: true }}
                loop={productImages.length > 1}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                }}
                className="rounded-xl overflow-hidden mb-4 group border border-gray-50"
              >
                {productImages.map((img, index) => (
                  <SwiperSlide key={`main-${img}-${index}`}>
                    <div className="h-96 bg-white flex items-center justify-center overflow-hidden p-2 select-none">
                      <Image
                        src={img}
                        alt={product.title}
                        width={500}
                        height={500}
                        priority={index === 0}
                        className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs, FreeMode]}
                spaceBetween={8}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                className="thumbnail-swiper"
                breakpoints={{
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 4 },
                }}
              >
                {productImages.map((img, index) => (
                  <SwiperSlide
                    key={`thumb-${img}-${index}`}
                    className="cursor-pointer"
                  >
                    <div className="h-20 border-2 border-gray-200 hover:border-gray-300 rounded-lg overflow-hidden bg-white transition-all duration-200 p-1 flex items-center justify-center">
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="max-w-full max-h-full object-contain pointer-events-none select-none"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div id="product-info" className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.category?.name && (
                  <a
                    href={`/categories/${product.category._id}`}
                    className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-emerald-100 transition"
                  >
                    {product.category.name}
                  </a>
                )}
                {product.brand?.name && (
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {product.brand.name}
                  </span>
                )}
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <Rating rating={product.ratingsAverage} />

                <span className="text-sm text-gray-600 font-medium">
                  {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                </span>
              </div>

              <div className="flex items-center flex-wrap gap-3 mb-6 border-b border-gray-100 pb-5">
                {product.priceAfterDiscount ? (
                  <>
                    <span className="text-3xl font-extrabold text-emerald-600">
                      {product.priceAfterDiscount.toLocaleString()} EGP
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {product.price.toLocaleString()} EGP
                    </span>
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      Save {discountPercentage}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-gray-900">
                    {product.price.toLocaleString()} EGP
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                {isInStock ? (
                  <span
                    className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium ${
                      isLowStock
                        ? "bg-amber-50 text-amber-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isLowStock ? "bg-amber-500" : "bg-green-500"
                      }`}
                    />
                    {isLowStock
                      ? `Only ${product.quantity} left - Order soon!`
                      : "In Stock"}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium bg-red-50 text-red-700">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Out Of Stock
                  </span>
                )}
              </div>

              <div className="border-t border-gray-100 pt-5 mb-6">
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      disabled={quantity <= 1 || !isInStock}
                      className="px-4 py-3 disabled:opacity-40 text-gray-500 hover:bg-gray-50 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-12 text-center border-0 focus:ring-0 text-base font-bold text-gray-800"
                    />
                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(product.quantity, prev + 1),
                        )
                      }
                      disabled={quantity >= product.quantity || !isInStock}
                      className="px-4 py-3 disabled:opacity-40 text-gray-500 hover:bg-gray-50 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {product.quantity} available pieces
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Total Price:
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {(
                      (product.priceAfterDiscount ?? product.price) * quantity
                    ).toLocaleString()}{" "}
                    EGP
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="flex-1 cursor-pointer bg-emerald-600 text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/25"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button className="flex-1 cursor-pointer bg-gray-900 text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all">
                  <Bolt size={18} />
                  Buy Now
                </button>
              </div>

              <div className="flex gap-3 mb-8 border-b border-gray-100 pb-6">
                <button className="flex-1 border-2 cursor-pointer border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:border-emerald-300 hover:text-emerald-600 transition">
                  <Heart size={18} />
                  Add to Wishlist
                </button>
                <button className="border-2 cursor-pointer border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-emerald-300 hover:text-emerald-600 transition">
                  <Share2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <FaTruckFast size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Fast Delivery
                    </h4>
                    <p className="text-xs text-gray-500">
                      Free worldwide shipping
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <RotateCcw size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      30 Days Return
                    </h4>
                    <p className="text-xs text-gray-500">
                      100% Money back guarantee
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100/70 text-emerald-600">
                    <FaShieldAlt size={20} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Secure Payment
                    </h4>
                    <p className="text-xs text-gray-500">100% Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
