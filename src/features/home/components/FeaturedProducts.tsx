import Link from "next/link";
import Image from "next/image";
import { Heart, RefreshCw, Eye, Plus } from "lucide-react";
import { getProducts } from "@/features/products/server/products.actions";
import { ProductType } from "@/features/products/types/products.types";
import Rating from "@/components/ui/Rating";

export default async function FeaturedProducts() {
  const response = await getProducts();
  const products: ProductType[] = response?.data || [];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-800">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => {
            const hasDiscount = product.priceAfterDiscount
              ? product.priceAfterDiscount < product.price
              : false;

            const discountPercentage = product.priceAfterDiscount
              ? ((product.price - product.priceAfterDiscount) / product.price) *
                100
              : 0;

            return (
              <div
                key={product._id}
                className="group relative bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between"
              >
                <div className="relative">
                  {hasDiscount && (
                    <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded z-10">
                      -{discountPercentage.toFixed(0)}%
                    </span>
                  )}

                  <div className="absolute top-0 right-0 flex flex-col space-y-2 opacity-0 translate-x-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 z-10">
                    <button
                      className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-red-500 border border-gray-100 transition-colors cursor-pointer"
                      title="Add to wishlist"
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-emerald-600 border border-gray-100 transition-colors cursor-pointer"
                      title="Compare"
                    >
                      <RefreshCw size={14} />
                    </button>
                    <Link
                      href={`/products/${product._id}`}
                      className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-emerald-600 border border-gray-100 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>

                  <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden mb-4">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                </div>

                <div className="flex flex-col grow">
                  <div className="text-xs text-gray-500 mb-1">
                    {product.category?.name || "Women's Fashion"}
                  </div>

                  <h3 className="font-medium mb-1 text-gray-800 hover:text-emerald-600 transition-colors line-clamp-2 min-h-10">
                    <Link
                      href={`/products/${product._id}`}
                      title={product.title}
                      className="cursor-pointer"
                    >
                      {product.title}
                    </Link>
                  </h3>

                  <div className="flex items-center mb-3 gap-2">
                    <Rating rating={product.ratingsAverage} />
                    <span className="text-xs text-gray-500 font-semibold mt-0.5">
                      {product.ratingsAverage} ({product.ratingsQuantity})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                      {hasDiscount ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">
                            {product.priceAfterDiscount}{" "}
                            <span className="text-xs font-semibold">EGP</span>
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {product.price} EGP
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {product.price}{" "}
                          <span className="text-xs font-semibold">EGP</span>
                        </span>
                      )}
                    </div>
                    <button
                      className="h-10 w-10 rounded-full flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all shadow-sm cursor-pointer"
                      title="Add to Cart"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
