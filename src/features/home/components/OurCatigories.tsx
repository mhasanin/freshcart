import { getAllCategories } from "@/features/catigories/server/catigories.serveractions";
import Link from "next/link";
import Image from "next/image";

export default async function OurCatigories() {
  const response = await getAllCategories();
  const categories = response?.data || [];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-8xl border-l-4 border-green-500 pl-3">
            Shop By Category
          </h2>
          <Link
            href="/categories"
            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1 transition-colors"
          >
            View All Categories <span>→</span>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="flex flex-col items-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-white text-center group"
            >
              {/* Image Container */}
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3 bg-gray-50 flex items-center justify-center relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Name */}
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors line-clamp-1">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
