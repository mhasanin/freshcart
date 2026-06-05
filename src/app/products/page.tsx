import { getProducts } from "@/features/products/server/products.actions";

export default async function ProductsPage() {
  const response = await getProducts();
  const products = response?.data ?? [];

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="mt-2 text-gray-600">
            Browse all available products. Total items: {products.length}
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {product.title}
              </h2>
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                {product.description}
              </p>
              <p className="mt-4 text-lg font-bold text-emerald-600">
                {product.priceAfterDiscount ?? product.price} EGP
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
